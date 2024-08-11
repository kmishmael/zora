from flask import Blueprint, request, jsonify
from models.models import User, PerformanceGoal, Incentive
from db.database import db

performance_bp = Blueprint('performance', __name__)


@performance_bp.route('/performance_goals', methods=['GET'])
def get_performance_goals():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Filtering
    user_id_filter = request.args.get('user_id', type=int)
    min_target_sales = request.args.get('min_target_sales', type=int)
    max_target_sales = request.args.get('max_target_sales', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    # Base query
    query = PerformanceGoal.query

    # Apply filters
    if user_id_filter:
        query = query.filter(PerformanceGoal.user_id == user_id_filter)
    if min_target_sales is not None:
        query = query.filter(PerformanceGoal.target_sales >= min_target_sales)
    if max_target_sales is not None:
        query = query.filter(PerformanceGoal.target_sales <= max_target_sales)
    if start_date:
        query = query.filter(PerformanceGoal.start_date >= start_date)
    if end_date:
        query = query.filter(PerformanceGoal.end_date <= end_date)

    # Pagination
    performance_goals = query.paginate(page=page, per_page=per_page, error_out=False)

    # JSON response
    return jsonify({
        'performance_goals': [goal.to_dict() for goal in performance_goals.items],  # Assuming `to_dict()` method is implemented in PerformanceGoal model
        'total': performance_goals.total,
        'pages': performance_goals.pages,
        'current_page': performance_goals.page
    })

@performance_bp.route('/performance_goals/<int:id>', methods=['GET'])
def get_performance_goal(id):
    performance_goal = PerformanceGoal.query.get_or_404(id)
    return jsonify(performance_goal.to_dict())

@performance_bp.route('/performance_goals', methods=['POST'])
def create_performance_goal():
    data = request.json
    new_performance_goal = PerformanceGoal(
        user_id=data['user_id'],
        target_sales=data['target_sales'],
        start_date=data['start_date'],
        end_date=data['end_date']
    )
    db.session.add(new_performance_goal)
    db.session.commit()
    return jsonify(new_performance_goal.to_dict()), 201

@performance_bp.route('/performance_goals/<int:id>', methods=['PUT'])
def update_performance_goal(id):
    performance_goal = PerformanceGoal.query.get_or_404(id)
    data = request.json
    performance_goal.user_id = data.get('user_id', performance_goal.user_id)
    performance_goal.target_sales = data.get('target_sales', performance_goal.target_sales)
    performance_goal.start_date = data.get('start_date', performance_goal.start_date)
    performance_goal.end_date = data.get('end_date', performance_goal.end_date)

    db.session.commit()
    return jsonify(performance_goal.to_dict())


@performance_bp.route('/performance_goals/<int:id>', methods=['DELETE'])
def delete_performance_goal(id):
    performance_goal = PerformanceGoal.query.get_or_404(id)
    db.session.delete(performance_goal)
    db.session.commit()
    return jsonify({'message': 'Performance goal deleted successfully'}), 204

@performance_bp.route('/performance_goals/<int:id>/incentives', methods=['GET'])
def get_incentives_for_performance_goal(id):
    performance_goal = PerformanceGoal.query.get_or_404(id)
    incentives = Incentive.query.filter_by(performance_goal_id=performance_goal.id).all()
    return jsonify([incentive.to_dict() for incentive in incentives])

@performance_bp.route('/performance_goals/<int:id>/user', methods=['GET'])
def get_user_for_performance_goal(id):
    performance_goal = PerformanceGoal.query.get_or_404(id)
    user = User.query.get_or_404(performance_goal.user_id)
    return jsonify(user.to_dict())
