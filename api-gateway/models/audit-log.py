from db.database import db
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship

class AuditLog(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    action = Column(String(200), nullable=False)
    timestamp = Column(DateTime, nullable=False, default=db.func.current_timestamp())
    
    user = relationship('User', back_populates='audit_logs')
    
    def __repr__(self):
        return f'<AuditLog {self.id}>'
