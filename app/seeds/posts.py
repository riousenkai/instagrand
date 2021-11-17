from app.models import db, Post
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, media_url='https://s3.amazonaws.com/nikeinc/assets/48622/2015-Nike-Mag-02_hd_1600.jpg?1445446034', description='Nike is the future.', createdAt=datetime.now())
    post2 = Post(user_id=1, media_url='https://sneakerbardetroit.com/wp-content/uploads/2021/09/Gundam-Nike-SB-Dunk-High-DH7717-100-Release-Date-Price-4-1068x714.jpg', description='Clean.', createdAt=datetime.now())
    post3 = Post(user_id=2, media_url='https://houseofheat.co/app/uploads/2021/09/Gundam-x-Nike-SB-Dunk-High-02-Banshee-DH7717-400-2.jpg', description='Gundam SB Dunks', createdAt=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
