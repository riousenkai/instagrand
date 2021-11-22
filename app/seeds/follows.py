from app.models import db, Follow


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follow1 = Follow(follower_id=1, following_id=2)
    follow2 = Follow(follower_id=2, following_id=1)
    follow3 = Follow(follower_id=3, following_id=1)
    follow4 = Follow(follower_id=3, following_id=2)
    follow5 = Follow(follower_id=4, following_id=2)
    follow6 = Follow(follower_id=5, following_id=2)
    follow7 = Follow(follower_id=6, following_id=2)
    follow8 = Follow(follower_id=7, following_id=2)
    follow9 = Follow(follower_id=8, following_id=2)
    follow10 = Follow(follower_id=9, following_id=2)


    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.add(follow7)
    db.session.add(follow8)
    db.session.add(follow9)
    db.session.add(follow10)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
