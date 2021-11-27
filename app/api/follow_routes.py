from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Follow, User, db, Notification

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
    new_notification = Notification(sender=current_user.id, message='started following you.', user_id=id, link=f'/users/{current_user.id}')

    db.session.add(new_notification)
    db.session.add(follow)
    db.session.commit()

    return user(id)

@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow(id):

    follow = Follow.query.filter_by(follower_id=current_user.id, following_id=id).first()
    notif = Notification.query.filter_by(sender=current_user.id, message='started following you.', link=f'/users/{current_user.id}').first()

    if notif != None:
        db.session.delete(notif)
        db.session.commit()
    db.session.delete(follow)
    db.session.commit()

    return user(id)

@follow_routes.route('/suggestions')
@login_required
def suggestions():

    following = Follow.query.filter_by(follower_id=current_user.id).all()
    following_users = []

    for follow in following:
        follow_user = User.query.get(follow.following_id)
        following_users.append(follow_user)

    total_follows = []

    for follow in following:
        follow_find = Follow.query.filter_by(follower_id=follow.following_id).all()
        for item in follow_find:
            find_user = User.query.get(item.following_id)
            total_follows.append(find_user)

    total_set = set(total_follows)
    following_set = set(following_users)

    final = list(total_set - following_set)

    if current_user in final:
        final.remove(current_user)

    # sorter = sorted(final, key=lambda x:x.id)

    return {'final': [user.to_dict() for user in final]}
