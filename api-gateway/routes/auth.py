from flask import Blueprint, request, jsonify
from models.models import User, UserRole
from db.database import db
from datetime import datetime, timedelta
import jwt
from functools import wraps

auth_bp = Blueprint('auth', __name__)


SECRET_KEY = 'HDHIEUOWUOUNV=A'


def generate_token(user):
    payload = {
        'user_id': user.id,
        'name': user.name,
        'email': user.email,
        'exp': datetime.now() + timedelta(hours=24)  # Token expiration time
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(user, *args, **kwargs)
    return decorated


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 400

    new_user = User(name=name, email=email, password=password, role=UserRole.BASIC.value)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        token = generate_token(user)
        return jsonify({
            'name': user.name,
            'email': user.email,
            'role': user.role,
            'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@auth_bp.route('/current_user', methods=['GET'])
@token_required
def get_current_user(user):
    return jsonify({
        'name': user.name,
        'email': user.email
    }), 200
