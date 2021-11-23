from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', image_url='https://www.designscene.net/wp-content/uploads/2020/04/Louis-Vuitton-New-Classic-Bags-Craig-McDean-00.jpg', description='I am the demo user.', name='Demo User')
    instagrand = User(
        username='instagrand', email='instagrand@heroku.com', password='instagrandmaster', image_url='https://img.icons8.com/clouds/150/000000/instagram.png', description='Yours To Make', name='Instagrand')
    neb = User(
        username='nebbb', email='neb@aa.io', password='nebbb', image_url='https://www.philasun.com/wp-content/uploads/2018/09/twitta.png', description='Number 1 student of App Academy', name='Neb')
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
        username='revan', email='revan@revan.com', password='revan123', image_url='https://media-exp1.licdn.com/dms/image/C4E03AQGsNwVN7pC2Jw/profile-displayphoto-shrink_800_800/0/1517237423843?e=1642636800&v=beta&t=oCS6uoTPKOV8lKH5867PdZ5HYINZKJitzGsxYBbV7Q0', description='I may or may not have created this website.', name='Revan F'
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


    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
