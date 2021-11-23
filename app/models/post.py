from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    media_url = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(300), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'media_url': self.media_url,
            'description': self.description,
            'createdAt': self.createdAt
        }

    user = db.relationship("User", back_populates='post')
    comment = db.relationship("Comment", back_populates="post", cascade="all,delete-orphan")
    like = db.relationship("Like", back_populates="post", cascade="all,delete-orphan")
