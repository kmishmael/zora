from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class Incentive(db.Model):
    id = Column(Integer, primary_key=True)
    performance_goal_id = Column(Integer, db.ForeignKey('performance_goal.id'), nullable=False)
    description = Column(Text, nullable=False)
    amount = Column(Float, nullable=False)
    
    performance_goal = relationship('PerformanceGoal', back_populates='incentives')
    
    def __repr__(self):
        return f'<Incentive {self.id}>'