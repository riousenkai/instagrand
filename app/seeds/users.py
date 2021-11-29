from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', image_url='http://media.gadgetsin.com/2014/10/star_wars_clone_trooper_bust_money_bank.jpg', description='I am the demo user.', name='Demo User')
    instagrand = User(
        username='instagrand', email='instagrand@heroku.com', password='instagrandmaster', image_url='https://img.icons8.com/clouds/150/000000/instagram.png', description='Yours To Make', name='Instagrand')
    neb = User(
        username='nebbb', email='neb@aa.io', password='nebbb', image_url='https://www.philasun.com/wp-content/uploads/2018/09/twitta.png', description='Twitta CEO', name='Neb')
    brandon = User(
        username='brandon', email='brandon@aa.io', password='brandisimo', image_url='http://cdn.gamer-network.net/2019/metabomb/overwatchptrpatch135willbuffreaperandjunkrat.jpg', description='I love Genshin Impact', name='Brandon L'
    )
    hacker = User(
        username='hacker', email='hacker@hacker.com', password='hacking', image_url='https://i.ytimg.com/vi/KEkrWRHCDQU/maxresdefault.jpg', description='I will hack you', name='Cohort Hacker'
    )
    tarkin = User(
        username='grand.moff.tarkin', email='grand@moff.com', password='grand', image_url='https://www.denofgeek.com/wp-content/uploads/2018/02/star-wars-grand-moff-tarkin.jpg?resize=768%2C432', description='There is no such thing as a death star', name='Wilhuff Tarkin'
    )
    canyon = User(
        username='grand.canyon', email='grand@canyon.com', password='grand123', image_url='https://www.visitgrandcanyon.com/~/media/images/grandcanyon/callouts/visitgrandcanyon-tn-home-canyon-vista.jpg', description='Grand Canyon National Park, in Arizona, is home to much of the immense Grand Canyon, with its layered bands of red rock revealing millions of years of geological history.', name='Grand Canyon'
    )
    creator = User(
        username="creator", email='creator@revan.com', password='creator123420', image_url='https://cdna.artstation.com/p/assets/images/images/036/541/778/large/scott-thumbnail.jpg?1617929132', description='Please see the about page for more information!', name='Creator'
    )
    revan = User(
        username='revan', email='revan@revan.com', password='revan123', image_url='https://instagrand-aa.s3.us-east-2.amazonaws.com/revan.jpg', description='I may or may not have created this website.', name='Revan F'
    )
    ann = User(
        username="annnnn", email='ann@aa.io', password='annann', image_url='https://res.cloudinary.com/dis83syog/image/upload/v1637629611/Countable/Screen_Shot_2021-11-22_at_8.06.32_PM_sf7msz.png', description="a/A Student", name='Ann'
    )
    rockstar = User(
        username="rockstar.games", email="rockstar@rockstar.com", password='gta123', image_url='https://eskipaper.com/images/rockstar-games-logo-wallpaper-1.jpg', description="Creator of Grand Theft Auto", name="Grand Theft Auto"
    )
    ariana = User(
        username="grand.e", email="arianagrande@aa.io", password='arianagrande', image_url='https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png', description="Ariana GRANDe", name="Ariana Grande"
    )
    andrew = User(
        username="andrew.codes", email="andrew@aa.io", password='andrew123', image_url='https://cdn.discordapp.com/attachments/857407992572018728/901251930465108038/Brad_with_Hair2.png', description="a/A Student", name="Andrew F"
    )
    david = User(
        username='daeviid', email="davidv@aa.io", password="david123", image_url="https://i.imgur.com/TQKRZRL.png", description='a/A student', name="David L"
    )


    db.session.add(demo)
    db.session.add(instagrand)
    db.session.add(neb)
    db.session.add(brandon)
    db.session.add(hacker)
    db.session.add(tarkin)
    db.session.add(canyon)
    db.session.add(creator)
    db.session.add(revan)
    db.session.add(ann)
    db.session.add(rockstar)
    db.session.add(ariana)
    db.session.add(andrew)
    db.session.add(david)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
