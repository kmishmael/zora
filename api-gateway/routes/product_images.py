from flask import Blueprint, request, jsonify
from models.models import Product, ProductImage
from db.database import db

product_images_bp = Blueprint('product_images', __name__)


@product_images_bp.route('/product-images', methods=['GET'])
def get_product_images():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    product_id_filter = request.args.get('product_id', type=int)
    url_filter = request.args.get('url')

    query = ProductImage.query

    if product_id_filter:
        query = query.filter(ProductImage.product_id == product_id_filter)
    if url_filter:
        query = query.filter(ProductImage.url.ilike(f"%{url_filter}%"))

    product_images = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'product_images': [image.to_dict() for image in product_images.items],  # Assuming `to_dict()` method is implemented in ProductImage model
        'total': product_images.total,
        'pages': product_images.pages,
        'current_page': product_images.page
    })

@product_images_bp.route('/product-images/<int:id>', methods=['GET'])
def get_product_image(id):
    product_image = ProductImage.query.get_or_404(id)
    return jsonify(product_image.to_dict())

@product_images_bp.route('/product-images', methods=['POST'])
def create_product_image():
    data = request.json
    new_product_image = ProductImage(
        product_id=data['product_id'],
        url=data['url']
    )
    db.session.add(new_product_image)
    db.session.commit()
    return jsonify(new_product_image.to_dict()), 201

@product_images_bp.route('/product-images/<int:id>', methods=['PUT'])
def update_product_image(id):
    product_image = ProductImage.query.get_or_404(id)
    data = request.json
    product_image.product_id = data.get('product_id', product_image.product_id)
    product_image.url = data.get('url', product_image.url)

    db.session.commit()
    return jsonify(product_image.to_dict())

@product_images_bp.route('/product-images/<int:id>', methods=['DELETE'])
def delete_product_image(id):
    product_image = ProductImage.query.get_or_404(id)
    db.session.delete(product_image)
    db.session.commit()
    return jsonify({'message': 'Product image deleted successfully'}), 204

@product_images_bp.route('/products/<int:product_id>/images', methods=['GET'])
def get_images_for_product(product_id):
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    images = db.session.query(ProductImage).join(Product).filter(ProductImage.product_id == product_id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'product_images': [image.to_dict() for image in images.items],
        'total': images.total,
        'pages': images.pages,
        'current_page': images.page
    })
