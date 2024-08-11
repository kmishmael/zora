from flask import Blueprint, request, jsonify
from models.models import Feedback, Sale, User, Product, Branch
from db.database import db

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
        'sales': [sale.to_dict() for sale in sales.items],  # Assuming `to_dict()` method is implemented in Sale model
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
        user_id=data['user_id'],
        branch_id=data['branch_id'],
        quantity=data['quantity'],
        total_price=data['total_price']
    )
    db.session.add(new_sale)
    db.session.commit()
    return jsonify(new_sale.to_dict()), 201

@sales_bp.route('/sales/<int:id>', methods=['PUT'])
def update_sale(id):
    sale = Sale.query.get_or_404(id)
    data = request.json
    sale.product_id = data.get('product_id', sale.product_id)
    sale.user_id = data.get('user_id', sale.user_id)
    sale.branch_id = data.get('branch_id', sale.branch_id)
    sale.quantity = data.get('quantity', sale.quantity)
    sale.total_price = data.get('total_price', sale.total_price)

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