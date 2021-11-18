from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, User, Post, db
from .post_routes import following_posts

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'], strict_slashes=False)
@login_required
def make_comment():

    new_comment = request.json

    comment = Comment(user_id=new_comment['user_id'], post_id=new_comment['post_id'], description=new_comment['description'])

    db.session.add(comment)
    db.session.commit()

    return following_posts()

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def make_comment(comment_id):

    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit(comment)

    return following_posts()
