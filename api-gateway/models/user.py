from db.database import db, bcrypt
import enum
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime

class UserRole(enum.Enum):
    MANAGER = "manager"
    SALESPERSON = "salesperson"

class User(db.Model):
    id = Column(db.Integer, primary_key=True)
    name = Column(String(80), unique=False, nullable=False)
    username = Column(db.String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(db.String(200), nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(db.String(50), nullable=False)  # 'manager' or 'sales'
    branch_id = Column(db.Integer, db.ForeignKey('branch.id'), nullable=True)

    branch = relationship('Branch', back_populates='users')
    sales = relationship('Sale', back_populates='user')
    performance_goals = relationship('PerformanceGoal', back_populates='user')
    commissions = relationship('Commission', back_populates='user')
    #feedback = relationship('Feedback', back_populates='user')

    def __init__(self, name, email, password):
        self.email = email
        self.name = name
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}>'
