from flask import Blueprint, request, jsonify
from models.models import User, UserRole, Branch, Product, Category
from db.database import db
import bcrypt
from datetime import datetime, timedelta
import jwt
from functools import wraps

product_bp = Blueprint('product', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    name_filter = request.args.get('name')
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    category_filter = request.args.get('category_id', type=int)

    query = Product.query

    if name_filter:
        query = query.filter(Product.name.ilike(f"%{name_filter}%"))
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if category_filter:
        query = query.filter(Product.category_id == category_filter)

    products = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'products': [product.to_dict() for product in products.items],
        'total': products.total,
        'pages': products.pages,
        'current_page': products.page
    })

@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict())

@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(
        name=data['name'],
        price=data['price'],
        description=data.get('description'),
        category_id=data['category_id']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@product_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.category_id = data.get('category_id', product.category_id)

    db.session.commit()
    return jsonify(product.to_dict())

@product_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 204

@product_bp.route('/products/<int:id>/details', methods=['GET'])
def get_product_details(id):
    product = db.session.query(Product).filter(Product.id == id).join(Category).first_or_404()

    return jsonify({
        'product': product.to_dict(),
        'category': product.category.to_dict(),
        'images': [image.to_dict() for image in product.images],
    })