from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, User
from sqlalchemy import or_

channel_routes = Blueprint('dm_channels', __name__)

@channel_routes.rotue('/')
@login_required
def get_channels():

    channels = Channel.query.filter_by(user1_id = current_user.id or_ user2_id = current_user.id)

    