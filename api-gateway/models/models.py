from db.database import db, bcrypt
import enum
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, DECIMAL, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from flask_login import UserMixin


class Role(enum.Enum):
    BASIC = 'BASIC'
    ADMIN = 'ADMIN'

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    image = Column(String(240), unique=False, nullable=True)
    password = Column(String, nullable=False)
    created_on = Column(DateTime, nullable=False, default=datetime.now())
    role = Column(Enum(Role), nullable=False, default=Role.BASIC)

    bids = relationship('Bid', backref='user', lazy=True)

    def __init__(self, name, email, password):
        self.email = email
        self.name = name
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class AuctionImage(db.Model):
    __tablename__ = 'auction_images'
    id = Column(Integer, primary_key=True)
    filename = Column(String(200), nullable=False)
    link = Column(String(200), nullable=False)
    url = Column(String(600), nullable=False)
    image_metadata = Column(JSON, nullable=True)
    auction_item_id = Column(Integer, db.ForeignKey(
        'auction_items.id'), nullable=False)


class Bid(db.Model):
    __tablename__ = 'bids'
    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    user_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    auction_item_id = Column(Integer, db.ForeignKey(
        'auction_items.id'), nullable=False)

class AuctionItem(db.Model):
    __tablename__ = 'auction_items'
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    starting_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False, default=0.0)
    created_on = Column(DateTime, nullable=False, default=datetime.now())
    updated_on = Column(DateTime, nullable=False, default=datetime.now())

    bids = relationship('Bid', backref='auction_item', lazy=True)
    images = relationship('AuctionImage', backref='auction_item', lazy=True)


