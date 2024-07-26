from flask import Blueprint, request, jsonify
from models.models import User, AuctionItem, Bid
from db.database import db
from flask_login import login_user, logout_user, current_user
from datetime import datetime, timedelta
import jwt
from functools import wraps

main_bp = Blueprint('main', __name__)

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


@main_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 400

    new_user = User(name=name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@main_bp.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        token = generate_token(user)
        print('token -> ', token)
        return jsonify({
            'name': user.name,
            'email': user.email,
            'role': user.role.value,
            'token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@main_bp.route('/current_user', methods=['GET'])
@token_required
def get_current_user(user):
    return jsonify({
        'name': user.name,
        'email': user.email
    }), 200

@main_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@main_bp.route('/auction-items', methods=['POST'])
def create_auction_item():
    data = request.get_json()
    new_item = AuctionItem(
        title=data['title'],
        description=data['description'],
        starting_price=data['starting_price'],
        current_price=data['starting_price']
    )
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Auction item created successfully'}), 201


@main_bp.route('/bids', methods=['POST'])
def create_bid():
    data = request.get_json()
    auction_item = AuctionItem.query.get(data['auction_item_id'])
    if not auction_item:
        return jsonify({'message': 'Auction item not found'}), 404
    new_bid = Bid(
        amount=data['amount'],
        user_id=data['user_id'],
        auction_item_id=data['auction_item_id']
    )
    auction_item.current_price = data['amount']
    db.session.add(new_bid)
    db.session.commit()
    return jsonify({'message': 'Bid placed successfully'}), 201


@main_bp.route('/auction-items/<int:item_id>', methods=['GET'])
def get_auction_item(item_id):
    auction_item = AuctionItem.query.get_or_404(item_id)
    return jsonify({
        'id': auction_item.id,
        'title': auction_item.title,
        'description': auction_item.description,
        'starting_price': auction_item.starting_price,
        'current_price': auction_item.current_price
    })


@main_bp.route('/users/<int:user_id>/bids', methods=['GET'])
def get_user_bids(user_id):
    user = User.query.get_or_404(user_id)
    bids = [{'id': bid.id, 'amount': bid.amount,
             'auction_item_id': bid.auction_item_id} for bid in user.bids]
    return jsonify(bids)


@main_bp.errorhandler(401)
def unauthorized_page(error):
    return "Permission Denied", 401


@main_bp.errorhandler(404)
def page_not_found(error):
    return "Not Found!", 404


@main_bp.errorhandler(500)
def server_error_page(error):
    return "Server Error", 500
