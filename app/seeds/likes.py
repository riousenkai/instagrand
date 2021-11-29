from app.models import db, Like


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(user_id=1, post_id=2)
    like2 = Like(user_id=2, post_id=1)
    like3 = Like(user_id=3, post_id=1)
    like4 = Like(user_id=4, post_id=1)
    like5 = Like(user_id=5, post_id=1)
    like6 = Like(user_id=6, post_id=1)
    like7 = Like(user_id=7, post_id=1)
    like8 = Like(user_id=8, post_id=1)
    like9 = Like(user_id=9, post_id=1)
    like10 = Like(user_id=10, post_id=1)
    like11 = Like(user_id=11, post_id=1)
    like12 = Like(user_id=12, post_id=1)
    like13 = Like(user_id=13, post_id=1)
    like14 = Like(user_id=14, post_id=1)
    like15 = Like(user_id=9, post_id=3)
    like16 = Like(user_id=8, post_id=3)
    like17 = Like(user_id=13, post_id=4)
    like18 = Like(user_id=14, post_id=4)
    like19 = Like(user_id=4, post_id=5)
    like20 = Like(user_id=3, post_id=5)
    like21 = Like(user_id=14, post_id=5)
    like22 = Like(user_id=6, post_id=6)
    like23 = Like(user_id=8, post_id=6)
    like24 = Like(user_id=5, post_id=6)
    like25 = Like(user_id=7, post_id=6)
    like26 = Like(user_id=13, post_id=7)
    like27 = Like(user_id=3, post_id=7)
    like28 = Like(user_id=2, post_id=7)
    like29 = Like(user_id=9, post_id=7)
    like30 = Like(user_id=4, post_id=8)
    like31 = Like(user_id=13, post_id=8)
    like32 = Like(user_id=10, post_id=8)
    like33 = Like(user_id=4, post_id=9)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
