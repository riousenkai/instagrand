from app.models import db, Post
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(user_id=1, media_url='https://s3.amazonaws.com/nikeinc/assets/48622/2015-Nike-Mag-02_hd_1600.jpg?1445446034', description='Cost almost one grand.', createdAt=datetime.now())
    post2 = Post(user_id=1, media_url='https://sneakerbardetroit.com/wp-content/uploads/2021/09/Gundam-Nike-SB-Dunk-High-DH7717-100-Release-Date-Price-4-1068x714.jpg', description='Sold out.', createdAt=datetime.now())
    post3 = Post(user_id=2, media_url='https://cdn.shopify.com/s/files/1/1501/7282/products/EDC2020-All-Are-Welcome-Pin-f_9e8a765e-2706-47d9-9023-400fb4ad15ef_2048x2048.jpg?v=1588960867', description='Welcome! Follow users to populate your feed.', createdAt=datetime.now())
    post4 = Post(user_id=9, media_url='https://i.imgur.com/QCSsHpt.jpg', description='Go Chicago Bears!', createdAt=datetime.now())
    post5 = Post(user_id=9, media_url='https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/attractions/disneyland/sleeping-beauty-castle-walkthrough/sleeping-beauty-castle-exterior-16x9.jpg?1593556896598', description='Going here after a/A graduation.', createdAt=datetime.now())
    post6 = Post(user_id=1, media_url='https://www.liveabout.com/thmb/uTB3L4WlPJpu3DRLLQB2N1A6CRA=/1299x1299/smart/filters:no_upscale()/Clone-Warriors_ACW-IA-15137_L_8x10-56a839265f9b58b7d0f1a639.jpg', description='Star Wars: Grand Army of the Republic', createdAt=datetime.now())
    post7 = Post(user_id=14, media_url='https://i.imgur.com/nFgeUhK.png', description='What a grand time going to EDC!', createdAt=datetime.now())
    post8 = Post(user_id=14, media_url='https://i.imgur.com/1wdbnNf.png', description='Amazing view.', createdAt=datetime.now())
    post9 = Post(user_id=9, media_url='https://i.imgur.com/vomK1D5.jpg', description='My next Gundam kit', createdAt=datetime.now())
    post10 = Post(user_id=9, media_url='https://i.imgur.com/IGmthKs.jpg', description='I was actually in Star Wars', createdAt=datetime.now())
    post11 = Post(user_id=9, media_url='https://i.imgur.com/zyyvDkT.jpg', description="You can tell I don't play", createdAt=datetime.now())
    post12 = Post(user_id=9, media_url='https://i.imgur.com/IOYjKXM.jpg?5', description='Was the Green Ranger for Halloween a while back', createdAt=datetime.now())
    post13 = Post(user_id=9, media_url='https://i.imgur.com/CDA2VwN.jpg', description='Got my picture taken by Insomniac during EDC. They said I hold my flag well.', createdAt=datetime.now())
    post14 = Post(user_id=3, media_url='https://i.imgur.com/zNDs3Li.jpg', description='Jett from Valorant', createdAt=datetime.now())
    post15 = Post(user_id=3, media_url='https://i.imgur.com/uQ1pQte.jpg', description='Finally saw Shang-Chi after @revan telling me to watch it for the 1000th time', createdAt=datetime.now())
    post16 = Post(user_id=3, media_url='https://i.imgur.com/9peZDQD.jpg', description='My favorite anime - Your Name', createdAt=datetime.now())
    post17 = Post(user_id=4, media_url='https://i.imgur.com/e9yCas3.jpg?2', description='This post rocks!', createdAt=datetime.now())
    post18 = Post(user_id=4, media_url='https://i.imgur.com/uWVZvE9.jpg?1', description='Love me some Genshin Impact', createdAt=datetime.now())
    post19 = Post(user_id=4, media_url='https://i.imgur.com/IhgQ2LW.jpg', description="Can't wait to work out a lot more once I graduate App Academy!", createdAt=datetime.now())
    post20 = Post(user_id=5, media_url='https://i.imgur.com/LsDxFD7.jpg', description='Hard at work!!!!', createdAt=datetime.now())
    post21 = Post(user_id=6, media_url='https://i.imgur.com/1zJR5Fp.png', description='Nothing to see here', createdAt=datetime.now())
    post22 = Post(user_id=7, media_url='https://i.imgur.com/eKbvLY6.jpg', description='Come experience this view live. Go visit the Grand Canyon!', createdAt=datetime.now())
    post23 = Post(user_id=8, media_url='https://i.imgur.com/DJQv5i5.jpg', description='Funko', createdAt=datetime.now())
    post24 = Post(user_id=10, media_url='https://ih1.redbubble.net/image.1313920099.8205/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg', description='Yes', createdAt=datetime.now())
    post25 = Post(user_id=10, media_url='https://i.imgur.com/WiHVYON.jpg', description='This is not what I meant when I said Europe', createdAt=datetime.now())
    post26 = Post(user_id=11, media_url='https://i.imgur.com/9sxGzGX.jpg', description="This game is old but we're still making money off of this so no GTA 6 for you...", createdAt=datetime.now())
    post27 = Post(user_id=12, media_url='https://i.imgur.com/LxYLBeM.jpg', description='Thinking of my crush, @revan', createdAt=datetime.now())
    post28 = Post(user_id=13, media_url='https://i.imgur.com/AjdDtGb.jpg', description='Not going to win this year because Revan is tearing it up at fantasy football', createdAt=datetime.now())
    post29 = Post(user_id=13, media_url='https://i.imgur.com/qU3Wimo.jpg', description='Love my city', createdAt=datetime.now())

    # post = Post(user_id=, media_url=, description=, createdAt=datetime.now())

    db.session.add(post3)
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post26)
    db.session.add(post27)
    db.session.add(post28)
    db.session.add(post29)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
