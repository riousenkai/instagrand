from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Follow, User, db

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/<int:id>')
@login_required
def user(id):
    followers = Follow.query.filter_by(following_id=id)
    following = Follow.query.filter_by(follower_id=id)

    fin_followers = []
    fin_following = []

    for user in followers:
        single = User.query.get(user.follower_id)
        fin_followers.append(single.to_dict())

    for user2 in following:
        single2 = User.query.get(user2.following_id)
        fin_following.append(single2.to_dict())


    return {'following': fin_following, 'followers': fin_followers}

@follow_routes.route('/<int:id>', methods=['POST'])
@login_required
def follow(id):

    follow = Follow(follower_id=current_user.id, following_id=id)

    db.session.add(follow)
    db.session.commit()

    return user(id)

@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow(id):

    follow = Follow.query.filter_by(follower_id=current_user.id, following_id=id).first()

    db.session.delete(follow)
    db.session.commit()

    return user(id)
