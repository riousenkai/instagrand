from .db import db

class DM_Channel(db.Model):
    __tablename__ = 'dm_channels'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user1 = db.relationship('User', back_populates="user_1", foreign_keys=[user1_id])
    user2 = db.relationship('User', back_populates="user_2", foreign_keys=[user2_id])

    messages = db.relationship('Message', back_populates="channel")

    def to_dict(self):
        return {
            'id': self.id,
            'user1_id': self.user1_id,
            'user2_id': self.user2_id,
            "user1": self.user1.to_dict(),
            'user2': self.user2.to_dict()
        }
