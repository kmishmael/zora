from flask import Blueprint, request, jsonify
from models.models import Product, ProductImage, Branch, Category
from db.database import db

category_bp = Blueprint('category', __name__)


@category_bp.route('/categories', methods=['GET'])
def get_categories():
    #page = request.args.get('page', 1, type=int)
    #per_page = request.args.get('per_page', 10, type=int)

    name_filter = request.args.get('name')

    query = Category.query

    if name_filter:
        query = query.filter(Category.name.ilike(f"%{name_filter}%"))

    categories = query.all()#.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'categories': [category.to_dict() for category in categories],
        #'total': categories.total,
        #'pages': categories.pages,
        #'current_page': categories.page
    })


@category_bp.route('/categories/<int:id>', methods=['GET'])
def get_category(id):
    category = Category.query.get_or_404(id)
    return jsonify(category.to_dict())


@category_bp.route('/categories', methods=['POST'])
def create_category():
    print("djdjdj")
    data = request.get_json()
    print(data)
    new_category = Category(
        name=data['name']
    )
    db.session.add(new_category)
    db.session.commit()
    return jsonify(new_category.to_dict()), 201


@category_bp.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    category = Category.query.get_or_404(id)
    data = request.json
    category.name = data.get('name', category.name)

    db.session.commit()
    return jsonify(category.to_dict())


@category_bp.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get_or_404(id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully'}), 204


@category_bp.route('/categories/<int:id>/products', methods=['GET'])
def get_products_for_category(id):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    products = db.session.query(Product).join(Category).filter(
        Product.category_id == id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'products': [product.to_dict() for product in products.items],
        'total': products.total,
        'pages': products.pages,
        'current_page': products.page
    })
