from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, User
from sqlalchemy import or_

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>')
@login_required
def get_msgs(id):

    messages = Message.query.filter_by(dm_id=id).order_by(Message.id.asc()).all(   )

    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/new', methods=['POST'])
@login_required
def new_msg():

    data = request.json

    message = Message(sender_id=current_user.id, receiver_id=data['receiver_id'], message=data['message'], dm_id=data['dm_id'])

    db.session.add(message)
    db.session.commit()

    return get_msgs(data['dm_id'])
