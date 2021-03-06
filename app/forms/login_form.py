from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email address and password do not match.')

def username_has_space(form, field):
    username = field.data
    if ' ' in username:
        raise ValidationError('Username cannot have spaces.')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email address and password do not match.')
    if not user.check_password(password):
        raise ValidationError('Email address and password do not match.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, username_has_space])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
