from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Branch(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    address = Column(String(200), nullable=False)
    
    users = relationship('User', back_populates='branch')
    sales = relationship('Sale', back_populates='branch')
    feedback = relationship('Feedback', back_populates='branch')
    
    def __repr__(self):
        return f'<Branch {self.name}>'
