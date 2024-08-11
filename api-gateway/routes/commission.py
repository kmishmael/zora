from flask import Blueprint, request, jsonify
from models.models import Feedback, Sale, User, Commission
from db.database import db

commission_bp = Blueprint('commission', __name__)


@commission_bp.route('/commissions', methods=['GET'])
def get_commissions():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    user_id_filter = request.args.get('user_id', type=int)
    sale_id_filter = request.args.get('sale_id', type=int)
    min_amount = request.args.get('min_amount', type=float)
    max_amount = request.args.get('max_amount', type=float)

    query = Commission.query

    if user_id_filter:
        query = query.filter(Commission.user_id == user_id_filter)
    if sale_id_filter:
        query = query.filter(Commission.sale_id == sale_id_filter)
    if min_amount is not None:
        query = query.filter(Commission.amount >= min_amount)
    if max_amount is not None:
        query = query.filter(Commission.amount <= max_amount)

    commissions = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        # Assuming `to_dict()` method is implemented in Commission model
        'commissions': [commission.to_dict() for commission in commissions.items],
        'total': commissions.total,
        'pages': commissions.pages,
        'current_page': commissions.page
    })


@commission_bp.route('/commissions/<int:id>', methods=['GET'])
def get_commission(id):
    commission = Commission.query.get_or_404(id)
    return jsonify(commission.to_dict())


@commission_bp.route('/commissions', methods=['POST'])
def create_commission():
    data = request.json
    new_commission = Commission(
        user_id=data['user_id'],
        sale_id=data['sale_id'],
        amount=data['amount']
    )
    db.session.add(new_commission)
    db.session.commit()
    return jsonify(new_commission.to_dict()), 201


@commission_bp.route('/commissions/<int:id>', methods=['PUT'])
def update_commission(id):
    commission = Commission.query.get_or_404(id)
    data = request.json
    commission.user_id = data.get('user_id', commission.user_id)
    commission.sale_id = data.get('sale_id', commission.sale_id)
    commission.amount = data.get('amount', commission.amount)

    db.session.commit()
    return jsonify(commission.to_dict())


@commission_bp.route('/commissions/<int:id>', methods=['DELETE'])
def delete_commission(id):
    commission = Commission.query.get_or_404(id)
    db.session.delete(commission)
    db.session.commit()
    return jsonify({'message': 'Commission deleted successfully'}), 204


@commission_bp.route('/commissions/<int:id>/sale', methods=['GET'])
def get_sale_for_commission(id):
    commission = Commission.query.get_or_404(id)
    sale = Sale.query.get_or_404(commission.sale_id)
    return jsonify(sale.to_dict())


@commission_bp.route('/commissions/<int:id>/user', methods=['GET'])
def get_user_for_commission(id):
    commission = Commission.query.get_or_404(id)
    user = User.query.get_or_404(commission.user_id)
    return jsonify(user.to_dict())

