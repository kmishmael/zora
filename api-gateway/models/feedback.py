from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Feedback(db.Model):
    id = Column(Integer, primary_key=True)
    sale_id = Column(Integer, db.ForeignKey('sale.id'), nullable=False)
    comment = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    timestamp = Column(DateTime, nullable=False, default=db.func.current_timestamp())
    
    sale = relationship('Sale', back_populates='feedback')
    
    def __repr__(self):
        return f'<Feedback {self.id}>'