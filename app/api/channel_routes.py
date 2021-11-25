from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DM_Channel, User, db
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

    return get_channels()
