from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Product(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, db.ForeignKey('category.id'), nullable=False)
    
    sales = relationship('Sale', back_populates='product')
    images = relationship('ProductImage', back_populates='product')
    category = relationship('Category', back_populates='products')

    def __repr__(self):
        return f'<Product {self.name}>'
    
class ProductImage(db.Model):
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, db.ForeignKey('product.id'), nullable=False)
    image_url = Column(String(200), nullable=False)
    
    product = relationship('Product', back_populates='images')
    
    def __repr__(self):
        return f'<ProductImage {self.id}>'