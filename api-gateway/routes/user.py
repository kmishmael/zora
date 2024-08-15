from flask import Blueprint, request, jsonify
from models.models import User, UserRole, Branch
from db.database import db
import bcrypt
from datetime import datetime, timedelta
import jwt
from functools import wraps

user_bp = Blueprint('user', __name__)


@user_bp.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    name_filter = request.args.get('name')
    email_filter = request.args.get('email')
    role_filter = request.args.get('role')
    branch_filter = request.args.get('branch_id')

    query = User.query

    if name_filter:
        query = query.filter(User.name.ilike(f"%{name_filter}%"))
    if email_filter:
        query = query.filter(User.email.ilike(f"%{email_filter}%"))
    if role_filter:
        query = query.filter(User.role == role_filter)
    if branch_filter:
        query = query.filter(User.branch_id == branch_filter)

    users = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'users': [user.to_dict() for user in users.items],
        'total': users.total,
        'pages': users.pages,
        'current_page': users.page
    })


@user_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())


@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role=data['role'],
        branch_id=data.get('branch_id')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.json
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.password = bcrypt.generate_password_hash(
        data['password']) if 'password' in data else user.password
    user.role = data.get('role', user.role)
    user.branch_id = data.get('branch_id', user.branch_id)

    db.session.commit()
    return jsonify(user.to_dict()), 204


@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 204


@user_bp.route('/users/<int:id>/details', methods=['GET'])
def get_user_details(id):
    user = db.session.query(User).filter(
        User.id == id).join(Branch).first_or_404()

    return jsonify({
        'user': user.to_dict(),
        'branch': user.branch.to_dict() if user.branch else None,
        'sales': [sale.to_dict() for sale in user.sales],
        'commissions': [commission.to_dict() for commission in user.commissions],
        'performance_goals': [goal.to_dict() for goal in user.performance_goals],
        'audit_logs': [log.to_dict() for log in user.audit_logs],
    })
