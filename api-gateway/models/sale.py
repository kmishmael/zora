from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Sale(db.Model):
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, db.ForeignKey('product.id'), nullable=False)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    branch_id = Column(Integer, db.ForeignKey('branch.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False, default=db.func.current_timestamp())
    
    user = relationship('User', back_populates='sales')
    product = relationship('Product', back_populates='sales')
    branch = relationship('Branch', back_populates='sales')
    feedback = relationship('Feedback', back_populates='sale', uselist=False)  # One-to-one relationship
    
    def __repr__(self):
        return f'<Sale {self.id}>'
