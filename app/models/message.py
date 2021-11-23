from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(users.id), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey(users.id), nullable=False)
    message = db.Column(db.Text, nullable=False)
    dm_id = db.Column(db.Integer, db.ForeignKey(dm_channels.id), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'message': self.message,
            'dm_id': self.dm_id,
            'sender': self.sender.to_dict(),
            'receiver': self.receiver.to_dict()
        }

    sender_user = db.relationship('User', back_populates="sender", foreign_keys=[sender_id])
    receiver_user = db.relationship('User', back_populates="receiver", foreign_keys=[receiver_id])
