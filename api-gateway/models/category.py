from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Category(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    
    products = relationship('Product', back_populates='category')
    
    def __repr__(self):
        return f'<Category {self.name}>'