from flask import request
from flask import Blueprint, request, jsonify
from sqlalchemy import and_
from models.models import Commission, Feedback, Incentive, PerformanceGoal, Sale, User, Product, Branch
from db.database import db
from datetime import datetime, timedelta

sales_bp = Blueprint('sales', __name__)


@sales_bp.route('/sales', methods=['GET'])
def get_sales():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Filtering
    user_id_filter = request.args.get('user_id', type=int)
    product_id_filter = request.args.get('product_id', type=int)
    branch_id_filter = request.args.get('branch_id', type=int)
    min_total_price = request.args.get('min_total_price', type=float)
    max_total_price = request.args.get('max_total_price', type=float)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    # Base query
    query = Sale.query

    # Apply filters
    if user_id_filter:
        query = query.filter(Sale.user_id == user_id_filter)
    if product_id_filter:
        query = query.filter(Sale.product_id == product_id_filter)
    if branch_id_filter:
        query = query.filter(Sale.branch_id == branch_id_filter)
    if min_total_price is not None:
        query = query.filter(Sale.total_price >= min_total_price)
    if max_total_price is not None:
        query = query.filter(Sale.total_price <= max_total_price)
    if start_date:
        query = query.filter(Sale.timestamp >= start_date)
    if end_date:
        query = query.filter(Sale.timestamp <= end_date)

    # Pagination
    sales = query.paginate(page=page, per_page=per_page, error_out=False)

    # JSON response
    return jsonify({
        # Assuming `to_dict()` method is implemented in Sale model
        'sales': [sale.to_dict() for sale in sales.items],
        'total': sales.total,
        'pages': sales.pages,
        'current_page': sales.page
    })


@sales_bp.route('/sales/<int:id>', methods=['GET'])
def get_sale(id):
    sale = Sale.query.get_or_404(id)
    return jsonify(sale.to_dict())


@sales_bp.route('/sales', methods=['POST'])
def create_sale():
    data = request.json
    new_sale = Sale(
        product_id=data['product_id'],
        customer_name=data['customer_name'],
        customer_email=data['customer_email'],
        user_id=data['user_id'],
        quantity=data['quantity'],
        total_price=data['total_price'],
        unit_price=data['unit_price']
    )
    db.session.add(new_sale)
    db.session.commit()

    commission_rate = 0.05
    commission_amount = new_sale.total_price * commission_rate

    new_commission = Commission(
        user_id=new_sale.user_id,
        sale_id=new_sale.id,
        amount=commission_amount
    )
    db.session.add(new_commission)
    performance_goal = PerformanceGoal.query.filter(
        and_(
            PerformanceGoal.user_id == new_sale.user_id,
            PerformanceGoal.start_date <= new_sale.timestamp,
            PerformanceGoal.end_date >= new_sale.timestamp
        )
    ).first()

    if performance_goal:
        performance_goal.achieved_sales += new_sale.total_price

        # Check if the goal is achieved and add an incentive if needed
        if performance_goal.achieved_sales >= performance_goal.target_sales:
            incentive_amount = performance_goal.incentive_amount
            new_incentive = Incentive(
                performance_goal_id=performance_goal.id,
                description="Achieved sales target",
                amount=incentive_amount
            )
            db.session.add(new_incentive)

    db.session.commit()

    return jsonify(new_sale.to_dict()), 201


@sales_bp.route('/sales/<int:id>', methods=['PUT'])
def update_sale(id):
    sale = Sale.query.get_or_404(id)
    data = request.json
    sale.product_id = data.get('product_id', sale.product_id)
    sale.customer_name = data.get('customer_name', sale.customer_name)
    sale.customer_email = data.get('customer_email', sale.customer_email)
    sale.user_id = data.get('user_id', sale.user_id)
    sale.branch_id = data.get('branch_id', sale.branch_id)
    sale.quantity = data.get('quantity', sale.quantity)
    sale.total_price = data.get('total_price', sale.total_price)
    sale.unit_price = data.get('unit_price', sale.unit_price)

    db.session.commit()
    return jsonify(sale.to_dict())


@sales_bp.route('/sales/<int:id>', methods=['DELETE'])
def delete_sale(id):
    sale = Sale.query.get_or_404(id)
    db.session.delete(sale)
    db.session.commit()
    return jsonify({'message': 'Sale deleted successfully'}), 204


@sales_bp.route('/sales/<int:id>/product', methods=['GET'])
def get_product_for_sale(id):
    sale = Sale.query.get_or_404(id)
    product = Product.query.get_or_404(sale.product_id)
    return jsonify(product.to_dict())


@sales_bp.route('/sales/<int:id>/user', methods=['GET'])
def get_user_for_sale(id):
    sale = Sale.query.get_or_404(id)
    user = User.query.get_or_404(sale.user_id)
    return jsonify(user.to_dict())


@sales_bp.route('/sales/<int:id>/branch', methods=['GET'])
def get_branch_for_sale(id):
    sale = Sale.query.get_or_404(id)
    branch = Branch.query.get_or_404(sale.branch_id)
    return jsonify(branch.to_dict())


@sales_bp.route('/sales/<int:id>/feedback', methods=['GET'])
def get_feedback_for_sale(id):
    sale = Sale.query.get_or_404(id)
    feedback = Feedback.query.filter_by(sale_id=sale.id).first()
    return jsonify(feedback.to_dict() if feedback else {'message': 'No feedback found'})


"""start of all in one Dashboard API"""


# @sales_bp.route('/sales/dashboard', methods=['GET'])
# def get_sales_dashboard():
#     # Total Sales
#     total_sales = db.session.query(db.func.sum(Sale.total_price)).scalar()

#     # Total Sales Target
#     total_sales_target = db.session.query(
#         db.func.sum(PerformanceGoal.target_sales)).scalar()

#     # Growth
#     current_period_start = datetime.now().replace(day=1)
#     previous_period_start = (current_period_start -
#                              timedelta(days=1)).replace(day=1)
#     previous_period_end = current_period_start - timedelta(days=1)

#     current_sales = db.session.query(db.func.sum(Sale.total_price))\
#         .filter(Sale.timestamp >= current_period_start)\
#         .scalar()

#     previous_sales = db.session.query(db.func.sum(Sale.total_price))\
#         .filter(Sale.timestamp >= previous_period_start, Sale.timestamp <= previous_period_end)\
#         .scalar()

#     growth = ((current_sales - previous_sales) / previous_sales) * \
#         100 if previous_sales else 0

#     # Top Salesman
#     top_salesman = db.session.query(
#         User.name, db.func.sum(Sale.total_price).label('total_sales')
#     ).select_from(Sale).join(User).group_by(User.name).order_by(db.desc('total_sales')).first()

#     # Salesmen Performance
#     salesmen_performance = db.session.query(
#         User.name,
#         Branch.name.label('branch_name'),
#         db.func.sum(Sale.total_price).label('total_sales'),
#         db.func.sum(PerformanceGoal.target_sales).label('sales_target'),
#         (db.func.sum(Sale.total_price) /
#          db.func.sum(PerformanceGoal.target_sales)).label('performance')
#     ).select_from(Sale).join(User).join(Branch).join(PerformanceGoal, Sale.user_id == PerformanceGoal.user_id).group_by(User.name, Branch.name).all()

#     # Branches Performance
#     branches_performance = db.session.query(
#         Branch.name,
#         db.func.sum(Sale.total_price).label('total_sales')
#     ).join(Sale, Branch.id == Sale.branch_id).group_by(Branch.name).all()
#     # Create the response

#     # Salesmen Leaderboard
#     salesmen_leaderboard = db.session.query(
#         User.name,
#         db.func.sum(Sale.total_price).label('total_sales')
#     ).select_from(Sale).join(User).group_by(User.name).order_by(db.desc('total_sales')).limit(10).all()

#     # Top Selling Products
#     top_selling_products = db.session.query(
#         Product.name,
#         db.func.sum(Sale.quantity).label('total_quantity')
#     ).select_from(Sale).join(Product).group_by(Product.name).order_by(db.desc('total_quantity')).limit(10).all()

#     # Sales Trend (using DATE() to truncate timestamp)
#     sales_trend = db.session.query(
#         db.func.date(Sale.timestamp).label('day'),
#         db.func.sum(Sale.total_price).label('total_sales')
#     ).select_from(Sale).group_by('day').order_by('day').all()

#     # Prepare the response
#     response = {
#         "totalSales": total_sales,
#         "totalSalesTarget": total_sales_target,
#         "growth": growth,
#         "topSalesman": {
#             "name": top_salesman.name,
#             "total_sales": top_salesman.total_sales
#         } if top_salesman else None,
#         "salesmenPerformance": [
#             {
#                 "salesman": sp.name,
#                 "total_sales": sp.total_sales,
#                 "performance": sp.performance,
#                 "sales_target": sp.sales_target,
#                 "branch_name": sp.branch_name,
#             } for sp in salesmen_performance
#         ],
#         "branchesPerformance": [
#             {
#                 "branch": bp.name,
#                 "total_sales": bp.total_sales,
#             } for bp in branches_performance
#         ],
#         "salesmenLeaderboard": [
#             {"salesman": s.name, "total_sales": s.total_sales}
#             for s in salesmen_leaderboard
#         ],
#         "topSellingProducts": [
#             {"product": p.name, "total_quantity": p.total_quantity}
#             for p in top_selling_products
#         ],
#         "salesTrend": [
#             {"date": st.day.isoformat(), "total_sales": st.total_sales}
#             for st in sales_trend
#         ]
#     }

#     return jsonify(response), 201


@sales_bp.route('/sales/dashbored', methods=['GET'])
def get_sales_dashbored():
    # Get the duration parameter from the request (defaults to '1m')
    duration = request.args.get('duration', '1m')

    # Calculate the current period start and previous period start based on the duration
    now = datetime.now()

    if duration == '1m':
        current_period_start = now.replace(day=1)
        previous_period_start = (
            current_period_start - timedelta(days=1)).replace(day=1)
    elif duration == '3m':
        current_period_start = (now.replace(
            day=1) - timedelta(days=90)).replace(day=1)
        previous_period_start = (
            current_period_start - timedelta(days=1)).replace(day=1)
    elif duration == '6m':
        current_period_start = (now.replace(
            day=1) - timedelta(days=180)).replace(day=1)
        previous_period_start = (
            current_period_start - timedelta(days=1)).replace(day=1)
    elif duration == '1y':
        current_period_start = now.replace(day=1, month=1)
        previous_period_start = current_period_start.replace(
            year=current_period_start.year - 1)

    # Calculate the end of the previous period
    previous_period_end = current_period_start - timedelta(days=1)

    # Total Sales for current and previous periods
    current_sales = db.session.query(db.func.sum(Sale.total_price))\
        .filter(Sale.timestamp >= current_period_start)\
        .scalar()

    previous_sales = db.session.query(db.func.sum(Sale.total_price))\
        .filter(Sale.timestamp >= previous_period_start, Sale.timestamp <= previous_period_end)\
        .scalar()

    # Calculate growth
    growth = ((current_sales - previous_sales) / previous_sales) * \
        100 if previous_sales else 0

    # Percentage change from the last duration
    percentage_change = ((current_sales - previous_sales) /
                         previous_sales) * 100 if previous_sales else 0

    # Total Sales Target (for the current period)
    total_sales_target = db.session.query(
        db.func.sum(PerformanceGoal.target_sales)
    ).filter(PerformanceGoal.start_date >= current_period_start).scalar()

    # Top Salesman
    top_salesman = db.session.query(
        User.name, db.func.sum(Sale.total_price).label('total_sales')
    ).select_from(Sale).join(User).filter(Sale.timestamp >= current_period_start)\
        .group_by(User.name).order_by(db.desc('total_sales')).first()

    # Salesmen Performance
    salesmen_performance = db.session.query(
        User.name,
        Branch.name.label('branch_name'),
        db.func.sum(Sale.total_price).label('total_sales'),
        db.func.sum(PerformanceGoal.target_sales).label('sales_target'),
        (db.func.sum(Sale.total_price) /
         db.func.sum(PerformanceGoal.target_sales)).label('performance')
    ).select_from(Sale).join(User).join(Branch).join(PerformanceGoal, Sale.user_id == PerformanceGoal.user_id).group_by(User.name, Branch.name).all()

    # Branches Performance
    branches_performance = db.session.query(
        Branch.name,
        db.func.sum(PerformanceGoal.target_sales).label('target_sales'),
        db.func.sum(Sale.total_price).label('actual_sales')
    ).join(Sale, Branch.id == Sale.branch_id).join(User, Branch.id == User.branch_id).join(PerformanceGoal, User.id == PerformanceGoal.user_id).filter(Sale.timestamp >= current_period_start).group_by(Branch.name).all()

    # Salesmen Leaderboard
    salesmen_leaderboard = db.session.query(
        User.name,
        Branch.name.label('branch_name'),
        db.func.sum(Sale.total_price).label('total_sales')
    ).select_from(Sale).join(User).join(Branch)\
        .filter(Sale.timestamp >= current_period_start)\
        .group_by(User.name, Branch.name)\
        .order_by(db.desc('total_sales')).limit(10).all()

    # Top Selling Products
    top_selling_products = db.session.query(
        Product.name,
        db.func.sum(Sale.quantity).label('total_quantity')
    ).select_from(Sale).join(Product)\
        .filter(Sale.timestamp >= current_period_start)\
        .group_by(Product.name).order_by(db.desc('total_quantity')).limit(10).all()

    # Sales Trend (using DATE() to truncate timestamp)
    sales_trend = db.session.query(
        db.func.date(Sale.timestamp).label('day'),
        db.func.sum(Sale.total_price).label('total_sales')
    ).select_from(Sale)\
        .filter(Sale.timestamp >= current_period_start)\
        .group_by('day').order_by('day').all()

    # Prepare the response
    response = {
        "totalSales": current_sales,
        "totalSalesTarget": total_sales_target,
        "growth": growth,
        "percentageChange": percentage_change,
        "topSalesman": {
            "name": top_salesman.name,
            "total_sales": top_salesman.total_sales
        } if top_salesman else None,
        "salesmenPerformance": [
            {
                "salesman": sp.name,
                "total_sales": sp.total_sales,
                "performance": sp.performance,
                "sales_target": sp.sales_target,
                "branch_name": sp.branch_name,
            } for sp in salesmen_performance
        ],
        "branchesPerformance": [
            {
                "branch": bp.name,
                "target_sales": bp.target_sales,
                "actual_sales": bp.actual_sales
            } for bp in branches_performance
        ],
        "salesmenLeaderboard": [
            {"rank": idx + 1, "salesman": s.name,
                "branch_name": s.branch_name, "total_sales": s.total_sales}
            for idx, s in enumerate(salesmen_leaderboard)
        ],
        "topSellingProducts": [
            {"product": p.name, "total_quantity": p.total_quantity}
            for p in top_selling_products
        ],
        "salesTrend": [
            {"date": st.day.isoformat(), "total_sales": st.total_sales}
            for st in sales_trend
        ]
    }

    return jsonify(response), 201


"""END of all in one Main Dashboard api"""


@sales_bp.route('/sales/dashboard/total-sales', methods=['GET'])
def get_total_sales():
    total_sales = db.session.query(db.func.sum(Sale.total_price)).scalar()
    return jsonify({"total_sales": total_sales})


@sales_bp.route('/sales/dashboard/total-sales-target', methods=['GET'])
def get_total_sales_target():
    total_sales_target = db.session.query(
        db.func.sum(PerformanceGoal.target_sales)).scalar()
    return jsonify({"total_sales_target": total_sales_target})


@sales_bp.route('/sales/dashboard/growth', methods=['GET'])
def get_growth():
    # Define the current and previous period dates
    current_period_start = datetime.now().replace(day=1)
    previous_period_start = (current_period_start -
                             timedelta(days=1)).replace(day=1)
    previous_period_end = current_period_start - timedelta(days=1)

    current_sales = db.session.query(db.func.sum(Sale.total_price)).filter(
        Sale.timestamp >= current_period_start).scalar()

    previous_sales = db.session.query(db.func.sum(Sale.total_price)).filter(
        Sale.timestamp >= previous_period_start, Sale.timestamp <= previous_period_end).scalar()

    growth = ((current_sales - previous_sales) / previous_sales) * \
        100 if previous_sales else 0
    return jsonify({"growth": growth})


@sales_bp.route('/sales/dashboard/top-salesman', methods=['GET'])
def get_top_salesman():
    top_salesman = db.session.query(
        User.name, db.func.sum(Sale.total_price).label('total_sales')
    ).join(Sale).group_by(User.name).order_by(db.desc('total_sales')).first()

    return jsonify({
        "top_salesman": top_salesman.name,
        "total_sales": top_salesman.total_sales
    })


@sales_bp.route('/sales/dashboard/salesmen-performance', methods=['GET'])
def get_salesmen_performance():
    salesmen_performance = db.session.query(
        User.name,
        db.func.sum(Sale.total_price).label('total_sales'),
        (db.func.sum(Sale.total_price) /
         db.func.sum(PerformanceGoal.target_sales)).label('performance')
    ).join(Sale).join(PerformanceGoal).group_by(User.name).all()

    return jsonify([
        {
            "salesman": sp.name,
            "total_sales": sp.total_sales,
            "performance": sp.performance
        } for sp in salesmen_performance
    ])


@sales_bp.route('/sales/dashboard/branches-performance', methods=['GET'])
def get_branches_performance():
    try:
        # Query to get branch performance
        branches_performance = db.session.query(
            Branch.name,
            db.func.sum(Sale.total_price).label('total_sales')
        ).join(Sale, Branch.id == Sale.branch_id) \
         .group_by(Branch.name).all()

        # Create the response
        result = [
            {
                "branch": bp.name,
                "total_sales": bp.total_sales
            } for bp in branches_performance
        ]

        return jsonify(result)

    except Exception as e:
        print(f"Error fetching branches performance: {e}")
        return jsonify({'error': 'Failed to fetch branches performance data'}), 500


@sales_bp.route('/sales/dashboard/salesmen-leaderboard', methods=['GET'])
def get_salesmen_leaderboard():
    leaderboard = db.session.query(
        User.name,
        db.func.sum(Sale.total_price).label('total_sales')
    ).join(Sale).group_by(User.name).order_by(db.desc('total_sales')).limit(10).all()

    return jsonify([
        {"salesman": s.name, "total_sales": s.total_sales}
        for s in leaderboard
    ])


@sales_bp.route('/sales/dashboard/top-selling-products', methods=['GET'])
def get_top_selling_products():
    top_products = db.session.query(
        Product.name,
        db.func.sum(Sale.quantity).label('total_quantity')
    ).join(Sale).group_by(Product.name).order_by(db.desc('total_quantity')).limit(10).all()

    return jsonify([
        {"product": p.name, "total_quantity": p.total_quantity}
        for p in top_products
    ])


@sales_bp.route('/sales/dashboard/sales-trend', methods=['GET'])
def get_sales_trend():
    sales_trend = db.session.query(
        db.func.date(Sale.timestamp).label('day'),
        db.func.sum(Sale.total_price).label('total_sales')
    ).group_by('day').order_by('day').all()

    return jsonify([
        {"date": st.day.isoformat(), "total_sales": st.total_sales}
        for st in sales_trend
    ])

# Specific saleman dashboard


@sales_bp.route('/sales/salesman/<int:user_id>/total-sales', methods=['GET'])
def get_salesman_total_sales(user_id):
    total_sales = db.session.query(db.func.sum(
        Sale.total_price)).filter_by(user_id=user_id).scalar()
    return jsonify({"total_sales": total_sales})


@sales_bp.route('/sales/salesman/<int:user_id>/sales-target', methods=['GET'])
def get_salesman_sales_target(user_id):
    sales_target = db.session.query(db.func.sum(
        PerformanceGoal.target_sales)).filter_by(user_id=user_id).scalar()
    return jsonify({"sales_target": sales_target})


@sales_bp.route('/sales/salesman/<int:user_id>/commission', methods=['GET'])
def get_salesman_commission(user_id):
    total_commission = db.session.query(db.func.sum(
        Commission.amount)).filter_by(user_id=user_id).scalar()
    return jsonify({"total_commission": total_commission})


@sales_bp.route('/sales/salesman/<int:user_id>/incentives', methods=['GET'])
def get_salesman_incentives(user_id):
    incentives = db.session.query(Incentive).join(
        PerformanceGoal).filter_by(user_id=user_id).all()
    return jsonify([incentive.to_dict() for incentive in incentives])


@sales_bp.route('/sales/salesman/<int:user_id>/sales-trend', methods=['GET'])
def get_salesman_sales_trend(user_id):
    sales_trend = db.session.query(
        db.func.date_trunc('day', Sale.timestamp).label('day'),
        db.func.sum(Sale.total_price).label('total_sales')
    ).filter_by(user_id=user_id).group_by('day').order_by('day').all()

    return jsonify([
        {"date": st.day.isoformat(), "total_sales": st.total_sales}
        for st in sales_trend
    ])


@sales_bp.route('/sales/salesman/<int:user_id>/commission-trend', methods=['GET'])
def get_salesman_commission_trend(user_id):
    commission_trend = db.session.query(
        db.func.date_trunc('day', Commission.timestamp).label('day'),
        db.func.sum(Commission.amount).label('total_commission')
    ).filter_by(user_id=user_id).group_by('day').order_by('day').all()

    return jsonify([
        {"date": ct.day.isoformat(), "total_commission": ct.total_commission}
        for ct in commission_trend
    ])


"""start of all in one API"""


@sales_bp.route('/sales/dashboard/salesman/<int:user_id>', methods=['GET'])
def get_salesman_data(user_id):
    # Total sales
    total_sales = db.session.query(db.func.sum(Sale.total_price)).filter_by(
        user_id=user_id).scalar() or 0

    # Sales target
    sales_target = db.session.query(db.func.sum(
        PerformanceGoal.target_sales)).filter_by(user_id=user_id).scalar() or 0

    # Total commission
    total_commission = db.session.query(db.func.sum(
        Commission.amount)).filter_by(user_id=user_id).scalar() or 0

    # Incentives
    incentives = db.session.query(Incentive).join(
        PerformanceGoal).filter_by(user_id=user_id).all()
    incentives_list = [incentive.to_dict() for incentive in incentives]

    # Sales trend
    sales_trend = db.session.query(
        db.func.date_format(Sale.timestamp, '%Y-%m-%d').label('day'),
        db.func.sum(Sale.total_price).label('total_sales')
    ).filter_by(user_id=user_id).group_by('day').order_by('day').all()

    sales_trend_list = [
        {"date": datetime.strptime(
            st.day, '%Y-%m-%d').isoformat(), "total_sales": st.total_sales}
        for st in sales_trend
    ]

    # Commission trend
    commission_trend = db.session.query(
        db.func.date_format(Commission.timestamp, '%Y-%m-%d').label('day'),
        db.func.sum(Commission.amount).label('total_commission')
    ).filter_by(user_id=user_id).group_by('day').order_by('day').all()

    commission_trend_list = [
        {"date": datetime.strptime(
            ct.day, '%Y-%m-%d').isoformat(), "total_commission": ct.total_commission}
        for ct in commission_trend
    ]

    # Combine all data into a single response
    response = {
        "total_sales": total_sales,
        "sales_target": sales_target,
        "total_commission": total_commission,
        "incentives": incentives_list,
        "sales_trend": sales_trend_list,
        "commission_trend": commission_trend_list
    }

    return jsonify(response), 201


"""end of all in one API"""
