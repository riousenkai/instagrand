from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import DM_Channel, User
from sqlalchemy import or_

channel_routes = Blueprint('dm_channels', __name__)

@channel_routes.route('/')
@login_required
def get_channels():

    channels = DM_Channel.query.filter(or_(DM_Channel.user1_id==current_user.id, DM_Channel.user2_id==current_user.id)).all()

    return {'ok': [channel.to_dict() for channel in channels]}
