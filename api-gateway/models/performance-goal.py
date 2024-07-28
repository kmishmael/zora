from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class PerformanceGoal(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, db.ForeignKey('user.id'), nullable=False)
    target_sales = Column(Integer, nullable=False)
    achieved_sales = Column(Integer, default=0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    
    user = relationship('User', back_populates='performance_goals')
    
    def __repr__(self):
        return f'<PerformanceGoal {self.id}>'