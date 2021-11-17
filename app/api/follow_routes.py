from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Follow, User

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

    for user in following:
        single = User.query.get(user.following_id)
        fin_following.append(single.to_dict())


    return {'following': fin_following, 'followers': fin_followers}
