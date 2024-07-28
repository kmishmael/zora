from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Commission(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    sale_id = Column(Integer, db.ForeignKey('sale.id'), nullable=False)
    amount = Column(Float, nullable=False)
    timestamp = Column(DateTime, nullable=False, default=db.func.current_timestamp())
    
    user = relationship('User', back_populates='commissions')
    sale = relationship('Sale', back_populates='commissions')
    
    def __repr__(self):
        return f'<Commission {self.id}>'