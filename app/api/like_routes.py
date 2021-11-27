from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, User, Post, db, Like, Notification
from .post_routes import following_posts

like_routes = Blueprint('likess', __name__)

@like_routes.route('/<int:id>', methods=['POST'])
@login_required
def like_post(id):

    like = Like.query.filter_by(user_id=current_user.id, post_id=id).first()
    post = Post.query.get(id)

    if like is None:
        new_notification = Notification(sender=current_user.id, message='liked your post.', user_id=post.user_id, link=f'/posts/{post.id}')
        new_like = Like(user_id=current_user.id, post_id=id)
        db.session.add(new_notification)
        db.session.add(new_like)
        db.session.commit()

    else:
        sent = Notification.query.filter_by(sender=current_user.id, message='liked your post.', link=f'/posts/{post.id}').first()
        if sent != None:
            db.session.delete(sent)
        db.session.delete(like)
        db.session.commit()

    return following_posts()
