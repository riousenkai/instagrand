from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(150), nullable=True)
    name = db.Column(db.String(40), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'description': self.description,
            'name': self.name
        }

    follower = db.relationship("Follow", back_populates="follower_user", foreign_keys="Follow.follower_id", cascade="all,delete-orphan")
    following = db.relationship("Follow", back_populates="following_user", foreign_keys="Follow.following_id", cascade="all,delete-orphan")
    post = db.relationship('Post', back_populates="user", cascade="all,delete-orphan")
    comment = db.relationship("Comment", back_populates="user", cascade="all,delete-orphan")
    like = db.relationship("Like", back_populates="user", cascade="all,delete-orphan")
    sender = db.relationship("Message", back_populates="sender_user", foreign_keys="Message.sender_id", cascade="all,delete-orphan")
    receiver = db.relationship("Message", back_populates="receiver_user", foreign_keys="Message.receiver_id", cascade="all,delete-orphan")
    user_1 = db.relationship("DM_Channel", back_populates="user1", foreign_keys="DM_Channel.user1_id", cascade="all,delete-orphan")
    user_2 = db.relationship("DM_Channel", back_populates="user2", foreign_keys="DM_Channel.user2_id", cascade="all,delete-orphan")
