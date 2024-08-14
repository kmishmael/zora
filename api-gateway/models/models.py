from db.database import db, bcrypt
import enum
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime


class UserRole(enum.Enum):
    MANAGER = "manager"
    SALESPERSON = "salesperson"
    BASIC = "basic"


class User(db.Model):
    id = Column(db.Integer, primary_key=True)
    name = Column(String(80), unique=False, nullable=False)
    # username = Column(db.String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(db.String(200), nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(db.String(50), nullable=False)  # 'manager' or 'sales'
    branch_id = Column(db.Integer, db.ForeignKey('branch.id'), nullable=True)

    branch = relationship('Branch', back_populates='users')
    sales = relationship('Sale', back_populates='user')
    performance_goals = relationship('PerformanceGoal', back_populates='user')
    commissions = relationship('Commission', back_populates='user')
    # Added audit_logs relationship
    audit_logs = relationship('AuditLog', back_populates='user')

    # feedback = relationship('Feedback', back_populates='user')

    def __init__(self, name, email, password, role):
        self.email = email
        self.name = name
        self.role = role
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'branch_id': self.branch_id,
            'created_on': self.created_on.isoformat(),
        }


class Product(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=False, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, db.ForeignKey('category.id'), nullable=False)

    sales = relationship('Sale', back_populates='product')
    images = relationship('ProductImage', back_populates='product')
    category = relationship('Category', back_populates='products')

    def __repr__(self):
        return f'<Product {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category.to_dict(),
            'images': [image.to_dict() for image in self.images]
        }


class ProductImage(db.Model):
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, db.ForeignKey('product.id'), nullable=False)
    url = Column(String(200), nullable=False)

    product = relationship('Product', back_populates='images')

    def __repr__(self):
        return f'<ProductImage {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'url': self.url,
        }


class Branch(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=False, nullable=False)
    address = Column(String(200), nullable=False)

    users = relationship('User', back_populates='branch')
    sales = relationship('Sale', back_populates='branch')

    def __repr__(self):
        return f'<Branch {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
        }


class Category(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    products = relationship('Product', back_populates='category')

    def __repr__(self):
        return f'<Category {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Incentive(db.Model):
    id = Column(Integer, primary_key=True)
    performance_goal_id = Column(Integer, db.ForeignKey(
        'performance_goal.id'), nullable=False)
    description = Column(Text, nullable=False)
    amount = Column(Float, nullable=False)

    performance_goal = relationship(
        'PerformanceGoal', back_populates='incentives')

    def __repr__(self):
        return f'<Incentive {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'performance_goal_id': self.performance_goal_id,
            'description': self.description,
            'amount': self.amount,
        }


class Feedback(db.Model):
    id = Column(Integer, primary_key=True)
    sale_id = Column(Integer, db.ForeignKey('sale.id'), nullable=False)
    comment = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    timestamp = Column(DateTime, nullable=False,
                       default=db.func.current_timestamp())

    sale = relationship('Sale', back_populates='feedback')

    def __repr__(self):
        return f'<Feedback {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'sale_id': self.sale_id,
            'comment': self.comment,
            'rating': self.rating,
            # Convert datetime to ISO format string
            'timestamp': self.timestamp.isoformat(),
        }


class Commission(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    sale_id = Column(Integer, db.ForeignKey('sale.id'), nullable=False)
    amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False,
                       default=db.func.current_timestamp())

    user = relationship('User', back_populates='commissions')
    sale = relationship('Sale', back_populates='commissions')

    def __repr__(self):
        return f'<Commission {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'sale_id': self.sale_id,
            'amount': self.amount,
            # Convert datetime to ISO format string
            'timestamp': self.timestamp.isoformat(),
        }


class Sale(db.Model):
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    branch_id = Column(Integer, db.ForeignKey('branch.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False,
                       default=db.func.current_timestamp())

    user = relationship('User', back_populates='sales')
    product = relationship('Product', back_populates='sales')
    branch = relationship('Branch', back_populates='sales')
    # One-to-one relationship
    feedback = relationship('Feedback', back_populates='sale', uselist=False)
    commissions = relationship('Commission', back_populates='sale')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'user_id': self.user_id,
            'branch_id': self.branch_id,
            'quantity': self.quantity,
            'total_price': self.total_price,
            # Convert datetime to ISO format string
            'timestamp': self.timestamp.isoformat(),
            # Include related feedback
            'feedback': self.feedback.to_dict() if self.feedback else None,
        }

    def __repr__(self):
        return f'<Sale {self.id}>'


class PerformanceGoal(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    target_sales = Column(Integer, nullable=False)
    achieved_sales = Column(Integer, default=0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    incentives = relationship('Incentive', back_populates='performance_goal')
    user = relationship('User', back_populates='performance_goals')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'target_sales': self.target_sales,
            'achieved_sales': self.achieved_sales,
            'start_date': self.start_date,
            'end_date': self.end_date.isoformat()
        }

    def __repr__(self):
        return f'<PerformanceGoal {self.id}>'


class AuditLog(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    action = Column(String(200), nullable=False)
    timestamp = Column(DateTime, nullable=False,
                       default=db.func.current_timestamp())

    user = relationship('User', back_populates='audit_logs')

    def __repr__(self):
        return f'<AuditLog {self.id}>'


def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'action': self.action,
        'timestamp': self.timestamp.isoformat(),
    }
