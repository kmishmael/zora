from flask import Blueprint, request, jsonify
from models.models import Feedback, Sale, User
from db.database import db

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedback', methods=['GET'])
def get_feedback():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    # Filtering
    sale_id_filter = request.args.get('sale_id', type=int)
    rating_filter = request.args.get('rating', type=int)

    # Base query
    query = Feedback.query

    # Apply filters
    if sale_id_filter:
        query = query.filter(Feedback.sale_id == sale_id_filter)
    if rating_filter:
        query = query.filter(Feedback.rating == rating_filter)

    # Pagination
    feedbacks = query.paginate(page=page, per_page=per_page, error_out=False)

    # JSON response
    return jsonify({
        'feedback': [feedback.to_dict() for feedback in feedbacks.items],  # Assuming `to_dict()` method is implemented in Feedback model
        'total': feedbacks.total,
        'pages': feedbacks.pages,
        'current_page': feedbacks.page
    })

@feedback_bp.route('/feedback/<int:id>', methods=['GET'])
def get_feedback_by_id(id):
    feedback = Feedback.query.get_or_404(id)
    return jsonify(feedback.to_dict())

@feedback_bp.route('/feedback', methods=['POST'])
def create_feedback():
    data = request.json
    new_feedback = Feedback(
        sale_id=data['sale_id'],
        comment=data['comment'],
        rating=data['rating']
    )
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify(new_feedback.to_dict()), 201

@feedback_bp.route('/feedback/<int:id>', methods=['PUT'])
def update_feedback(id):
    feedback = Feedback.query.get_or_404(id)
    data = request.json
    feedback.comment = data.get('comment', feedback.comment)
    feedback.rating = data.get('rating', feedback.rating)

    db.session.commit()
    return jsonify(feedback.to_dict())

@feedback_bp.route('/feedback/<int:id>', methods=['DELETE'])
def delete_feedback(id):
    feedback = Feedback.query.get_or_404(id)
    db.session.delete(feedback)
    db.session.commit()
    return jsonify({'message': 'Feedback deleted successfully'}), 204

@feedback_bp.route('/feedback/<int:id>/sale', methods=['GET'])
def get_sale_for_feedback(id):
    feedback = Feedback.query.get_or_404(id)
    sale = Sale.query.get_or_404(feedback.sale_id)
    return jsonify(sale.to_dict())

@feedback_bp.route('/feedback/<int:id>/user', methods=['GET'])
def get_user_for_feedback(id):
    feedback = Feedback.query.get_or_404(id)
    sale = Sale.query.get_or_404(feedback.sale_id)
    user = User.query.get_or_404(sale.user_id)
    return jsonify(user.to_dict())
