from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, User, db, Follow, DM_Channel
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

    channel = DM_Channel.query.get(data['dm_id'])
    if channel == None:
        new_channel = DM_Channel(user1_id=current_user.id, user2_id=data['receiver_id'])
        db.session.add(new_channel)
        db.session.commit()
        message = Message(sender_id=current_user.id, receiver_id=data['receiver_id'], message=data['message'], dm_id=new_channel.id)
    else:
        message = Message(sender_id=current_user.id, receiver_id=data['receiver_id'], message=data['message'], dm_id=data['dm_id'])

    db.session.add(message)
    db.session.commit()

    return get_msgs(data['dm_id'])

@message_routes.route('/list')
@login_required
def message_list():
    followers = Follow.query.filter_by(following_id=current_user.id)
    following = Follow.query.filter_by(follower_id=current_user.id)

    fin_followers = []
    fin_following = []

    for user in followers:
        single = User.query.get(user.follower_id)
        fin_followers.append(single)

    for user2 in following:
        single2 = User.query.get(user2.following_id)
        fin_following.append(single2)

    combined = list(set(fin_followers + fin_following))

    sort = sorted(combined, key=lambda x:x.username)

    return {'list': [item.to_dict() for item in sort]}
