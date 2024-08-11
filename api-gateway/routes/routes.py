from flask import Blueprint, request, jsonify
from models.models import User, UserRole
from db.database import db
from flask_login import login_user, logout_user, current_user
from datetime import datetime, timedelta
import jwt
from functools import wraps

main_bp = Blueprint('main', __name__)

@main_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@main_bp.errorhandler(401)
def unauthorized_page(error):
    return "Permission Denied", 401


@main_bp.errorhandler(404)
def page_not_found(error):
    return "Not Found!", 404


@main_bp.errorhandler(500)
def server_error_page(error):
    return "Server Error", 500
