from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, User, Post
from .post_routes import following_posts

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():

    data = request.json

    comment = Comment(user_id=data['user_id'], post_id=data['post_id'], description=data['description'])

    db.session.add(comment)
    db.session.commit()

    return following_posts()
