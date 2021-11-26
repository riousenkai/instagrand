from .db import db

class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Text, nullable=False)
    message = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    link = db.Column(db.String(255), nullable=False)
    read = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.username,
            'message': self.message,
            'user_id': self.user_id,
            'link': self.link,
            'read': self.read
        }
