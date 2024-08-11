from flask import Blueprint, request, jsonify
from models.models import Product, ProductImage, Branch
from db.database import db

branch_bp = Blueprint('branch', __name__)


@branch_bp.route('/branches', methods=['GET'])
def get_branches():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    name_filter = request.args.get('name')
    address_filter = request.args.get('address')

    query = Branch.query

    if name_filter:
        query = query.filter(Branch.name.ilike(f"%{name_filter}%"))
    if address_filter:
        query = query.filter(Branch.address.ilike(f"%{address_filter}%"))

    branches = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'branches': [branch.to_dict() for branch in branches.items],
        'total': branches.total,
        'pages': branches.pages,
        'current_page': branches.page
    })


@branch_bp.route('/branches/<int:id>', methods=['GET'])
def get_branch(id):
    branch = Branch.query.get_or_404(id)
    return jsonify(branch.to_dict())


@branch_bp.route('/branches', methods=['POST'])
def create_branch():
    data = request.json
    new_branch = Branch(
        name=data['name'],
        address=data['address']
    )
    db.session.add(new_branch)
    db.session.commit()
    return jsonify(new_branch.to_dict()), 201


@branch_bp.route('/branches/<int:id>', methods=['PUT'])
def update_branch(id):
    branch = Branch.query.get_or_404(id)
    data = request.json
    branch.name = data.get('name', branch.name)
    branch.address = data.get('address', branch.address)

    db.session.commit()
    return jsonify(branch.to_dict())


@branch_bp.route('/branches/<int:id>', methods=['DELETE'])
def delete_branch(id):
    branch = Branch.query.get_or_404(id)
    db.session.delete(branch)
    db.session.commit()
    return jsonify({'message': 'Branch deleted successfully'}), 204


@branch_bp.route('/branches/<int:id>/details', methods=['GET'])
def get_branch_details(id):
    branch = db.session.query(Branch).filter(Branch.id == id).first_or_404()

    return jsonify({
        'branch': branch.to_dict(),
        'users': [user.to_dict() for user in branch.users],
        'sales': [sale.to_dict() for sale in branch.sales],
    })
