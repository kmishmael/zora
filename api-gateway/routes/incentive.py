from flask import Blueprint, request, jsonify
from models.models import Product, ProductImage, Branch, Category, Incentive, PerformanceGoal
from db.database import db

incentive_bp = Blueprint('incentive', __name__)

@incentive_bp.route('/incentives', methods=['GET'])
def get_incentives():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Filtering
    performance_goal_id_filter = request.args.get('performance_goal_id', type=int)
    description_filter = request.args.get('description')

    # Base query
    query = Incentive.query

    # Apply filters
    if performance_goal_id_filter:
        query = query.filter(Incentive.performance_goal_id == performance_goal_id_filter)
    if description_filter:
        query = query.filter(Incentive.description.ilike(f"%{description_filter}%"))

    # Pagination
    incentives = query.paginate(page=page, per_page=per_page, error_out=False)

    # JSON response
    return jsonify({
        'incentives': [incentive.to_dict() for incentive in incentives.items],  # Assuming `to_dict()` method is implemented in Incentive model
        'total': incentives.total,
        'pages': incentives.pages,
        'current_page': incentives.page
    })

@incentive_bp.route('/incentives/<int:id>', methods=['GET'])
def get_incentive(id):
    incentive = Incentive.query.get_or_404(id)
    return jsonify(incentive.to_dict())

@incentive_bp.route('/incentives', methods=['POST'])
def create_incentive():
    data = request.json
    new_incentive = Incentive(
        performance_goal_id=data['performance_goal_id'],
        description=data['description'],
        amount=data['amount']
    )
    db.session.add(new_incentive)
    db.session.commit()
    return jsonify(new_incentive.to_dict()), 201

@incentive_bp.route('/incentives/<int:id>', methods=['PUT'])
def update_incentive(id):
    incentive = Incentive.query.get_or_404(id)
    data = request.json
    incentive.performance_goal_id = data.get('performance_goal_id', incentive.performance_goal_id)
    incentive.description = data.get('description', incentive.description)
    incentive.amount = data.get('amount', incentive.amount)

    db.session.commit()
    return jsonify(incentive.to_dict())

@incentive_bp.route('/incentives/<int:id>', methods=['DELETE'])
def delete_incentive(id):
    incentive = Incentive.query.get_or_404(id)
    db.session.delete(incentive)
    db.session.commit()
    return jsonify({'message': 'Incentive deleted successfully'}), 204

@incentive_bp.route('/incentives/<int:id>/performance-goal', methods=['GET'])
def get_performance_goal_for_incentive(id):
    incentive = Incentive.query.get_or_404(id)
    performance_goal = PerformanceGoal.query.get_or_404(incentive.performance_goal_id)
    return jsonify(performance_goal.to_dict())