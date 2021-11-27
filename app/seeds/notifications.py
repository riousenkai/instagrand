from app.models import db, Notification

# def seed_channels():
#     channel1 = DM_Channel(user1_id=1, user2_id=2)

#     db.session.add(channel1)

#     db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notifications():
    db.session.execute('TRUNCATE notifications RESTART IDENTITY CASCADE;')
    db.session.commit()
