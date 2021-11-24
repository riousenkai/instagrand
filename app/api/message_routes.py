from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, User
from sqlalchemy import or_

message_routes = Blueprint('messages', __messages__)

@message_routes.route('/<int:id>')
@login_required
def get_msgs(id):

    messages = Messages.query.filter_by(dm_id=id)

    return {'messages': [message.to_dict() for message in messages]}

