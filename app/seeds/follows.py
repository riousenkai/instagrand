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
    follow10 = Follow(following_id=9, follower_id=2)
    follow11 = Follow(following_id=2, follower_id=9)
    follow12 = Follow(follower_id=10, following_id=2)
    follow13 = Follow(following_id=3, follower_id=1)
    follow14 = Follow(following_id=3, follower_id=2)
    follow15 = Follow(following_id=4, follower_id=2)
    follow16 = Follow(following_id=5, follower_id=2)
    follow17 = Follow(following_id=6, follower_id=2)
    follow18 = Follow(following_id=7, follower_id=2)
    follow19 = Follow(following_id=8, follower_id=2)
    follow20 = Follow(following_id=10, follower_id=2)
    follow21 = Follow(following_id=11, follower_id=2)
    follow22 = Follow(following_id=2, follower_id=11)
    follow23 = Follow(following_id=2, follower_id=12)
    follow24 = Follow(following_id=12, follower_id=2)
    follow25 = Follow(following_id=2, follower_id=13)
    follow26 = Follow(following_id=13, follower_id=2)
    follow27 = Follow(following_id=2, follower_id=14)
    follow28 = Follow(following_id=14, follower_id=2)


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
    db.session.add(follow11)
    db.session.add(follow12)
    db.session.add(follow13)
    db.session.add(follow14)
    db.session.add(follow15)
    db.session.add(follow16)
    db.session.add(follow17)
    db.session.add(follow18)
    db.session.add(follow19)
    db.session.add(follow20)
    db.session.add(follow21)
    db.session.add(follow22)
    db.session.add(follow23)
    db.session.add(follow24)
    db.session.add(follow25)
    db.session.add(follow26)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
