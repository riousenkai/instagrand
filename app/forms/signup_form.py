from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')



def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    elif len(username) > 30:
        raise ValidationError('Username cannot be over 30 characters.')

def password_too_short(form, field):

    password = field.data
    if len(password) < 4:
        raise ValidationError('Password must be at least four characters long.')

def name_too_long(form, field):

    name = field.data
    if len(name) > 40:
        raise ValidationError('Full Name cannot be over 40 characters. Please use a nickname.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_too_short])
    name = StringField('name', validators=[DataRequired()], name_too_long)
