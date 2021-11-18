from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, User, Post, db, Like

like_routes = Blueprint('likess', __name__)

@like_routes.route('/<int:id>', methods=['POST'])
@login_required
def like_post(id):

    like = Like.query.filter_by(user_id=current_user.id, post_id=id)

    print(f'\n\n\n{like}\n\n\n')

    return {'msg': 'ok'}
