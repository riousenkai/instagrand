from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DM_Channel, User, db, Notification, Message
from sqlalchemy import or_

channel_routes = Blueprint('dm_channels', __name__)

@channel_routes.route('/all')
@login_required
def get_channels():

    channels = DM_Channel.query.filter(or_(DM_Channel.user1_id==current_user.id, DM_Channel.user2_id==current_user.id)).all()

    return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route('/new/<int:id>', methods=['POST'])
@login_required
def create_channel(id):

    channel1 = DM_Channel.query.filter(DM_Channel.user1_id==current_user.id, DM_Channel.user2_id==id).all()
    channel2 = DM_Channel.query.filter(DM_Channel.user1_id==id, DM_Channel.user2_id==current_user.id).all()

    if len(channel1) > 0 or len(channel2) > 0:
        return get_channels()

    channel = DM_Channel(user1_id=current_user.id, user2_id=id)
    db.session.add(channel)
    db.session.commit()

    new_channel = DM_Channel.query.filter_by(user1_id=current_user.id, user2_id=id).first()

    print(f'\n\n\n{new_channel.to_dict()}\n\n\n')

    return get_channels()

@channel_routes.route('/delete/<int:id>/<int:user_id>', methods=['DELETE'])
@login_required
def remove_channel(id, user_id):

    channel = DM_Channel.query.get(id)

    messages = Message.query.filter_by(dm_id=id).all()

    if len(messages) > 0:
        new_notification = Notification(sender=current_user.id, message='deleted your messages with them.', user_id=user_id, link='/messages')
        db.session.add(new_notification)
    db.session.delete(channel)
    db.session.commit()

    return get_channels()
