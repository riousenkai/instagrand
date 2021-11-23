from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.config import Config
from app.aws_s3 import *
from app.models import db, User, Post
import boto3
import botocore

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/search', methods=['PUT'])
@login_required
def search():

    data = request.json['input']

    users = User.query.filter(User.username.ilike(f'%{data}%'), User.username != current_user.username).all()
    users_name = User.query.filter(User.name.ilike(f'%{data}%'), User.name != current_user.name).all()

    combined_users = list(set(users + users_name))

    # return {'users': [user.to_dict() for user in users]}

    return {'users': [user.to_dict() for user in combined_users]}

@user_routes.route('/picture', methods=['POST'])
@login_required
def upload_pic():
    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files["file"]

    if file:
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)

        current_user.image_url = file_url

        db.session.commit()
        return current_user.to_dict()
    else:
        return 'No File Attached!'

@user_routes.route('/picture', methods=['DELETE'])
@login_required
def delete_pic():
    current_user.image_url = "https://nitreo.com/img/igDefaultProfilePic.png"
    db.session.commit()
    return current_user.to_dict()
