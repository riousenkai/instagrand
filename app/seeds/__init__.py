from flask.cli import AppGroup
from .users import seed_users, undo_users
from .follows import seed_follows, undo_follows
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .channels import seed_channels, undo_channels
from .notifications import undo_notifications

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_follows()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_channels()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_follows()
    undo_posts()
    undo_users()
    undo_likes()
    undo_channels()
    undo_notifications()
    # Add other undo functions here
