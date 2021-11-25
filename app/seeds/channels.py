from app.models import db, DM_Channel
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel1 = DM_Channel(user1_id=1, user2_id=2)

    db.session.add(channel1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE dm_channels RESTART IDENTITY CASCADE;')
    db.session.commit()
