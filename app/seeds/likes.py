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
    like34 = Like(user_id=6, post_id=10)
    like35 = Like(user_id=8, post_id=10)
    like36 = Like(user_id=12, post_id=11)
    like37 = Like(user_id=3, post_id=11)
    like38 = Like(user_id=3, post_id=12)
    like39 = Like(user_id=14, post_id=12)
    like40 = Like(user_id=13, post_id=12)
    like41 = Like(user_id=9, post_id=13)
    like42 = Like(user_id=3, post_id=13)
    like43 = Like(user_id=4, post_id=13)
    like44 = Like(user_id=9, post_id=14)
    like45 = Like(user_id=11, post_id=14)
    like46 = Like(user_id=10, post_id=15)
    like47 = Like(user_id=4, post_id=15)
    like48 = Like(user_id=9, post_id=15)
    like49 = Like(user_id=5, post_id=16)
    like50 = Like(user_id=3, post_id=16)
    like51 = Like(user_id=2, post_id=17)
    like52 = Like(user_id=1, post_id=17)
    like53 = Like(user_id=9, post_id=17)
    like54 = Like(user_id=14, post_id=17)
    like55 = Like(user_id=13, post_id=17)
    like56 = Like(user_id=10, post_id=17)
    like57 = Like(user_id=11, post_id=17)
    like58 = Like(user_id=9, post_id=18)
    like59 = Like(user_id=7, post_id=19)
    like60 = Like(user_id=8, post_id=19)
    like61 = Like(user_id=10, post_id=19)
    like62 = Like(user_id=9, post_id=19)
    like63 = Like(user_id=1, post_id=21)
    like64 = Like(user_id=8, post_id=22)
    like65 = Like(user_id=11, post_id=22)
    like66 = Like(user_id=9, post_id=23)
    like67 = Like(user_id=3, post_id=24)
    like68 = Like(user_id=4, post_id=24)
    like69 = Like(user_id=14, post_id=24)
    like70 = Like(user_id=13, post_id=24)
    like71 = Like(user_id=13, post_id=25)
    like72 = Like(user_id=14, post_id=25)
    like73 = Like(user_id=12, post_id=25)
    like74 = Like(user_id=3, post_id=25)
    like75 = Like(user_id=4, post_id=25)
    like76 = Like(user_id=10, post_id=25)
    like77 = Like(user_id=2, post_id=25)
    like78 = Like(user_id=8, post_id=25)
    like79 = Like(user_id=3, post_id=26)
    like80 = Like(user_id=9, post_id=26)
    like81 = Like(user_id=4, post_id=27)
    like82 = Like(user_id=9, post_id=27)
    like83 = Like(user_id=14, post_id=27)
    like84 = Like(user_id=13, post_id=27)
    like85 = Like(user_id=10, post_id=27)
    like86 = Like(user_id=14, post_id=28)
    like87 = Like(user_id=9, post_id=28)
    like88 = Like(user_id=1, post_id=29)
    like89 = Like(user_id=2, post_id=29)
    like90 = Like(user_id=3, post_id=29)
    like91 = Like(user_id=4, post_id=29)
    like92 = Like(user_id=6, post_id=29)
    like93 = Like(user_id=10, post_id=29)
    like94 = Like(user_id=11, post_id=29)
    like95 = Like(user_id=12, post_id=29)
    like96 = Like(user_id=13, post_id=29)
    like97 = Like(user_id=14, post_id=29)
    like98 = Like(user_id=7, post_id=29)
    like99 = Like(user_id=8, post_id=29)
    like100 = Like(user_id=5, post_id=29)



    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)
    db.session.add(like21)
    db.session.add(like22)
    db.session.add(like23)
    db.session.add(like24)
    db.session.add(like25)
    db.session.add(like26)
    db.session.add(like27)
    db.session.add(like28)
    db.session.add(like29)
    db.session.add(like30)
    db.session.add(like31)
    db.session.add(like32)
    db.session.add(like33)
    db.session.add(like34)
    db.session.add(like35)
    db.session.add(like36)
    db.session.add(like37)
    db.session.add(like38)
    db.session.add(like39)
    db.session.add(like40)
    db.session.add(like41)
    db.session.add(like42)
    db.session.add(like43)
    db.session.add(like44)
    db.session.add(like45)
    db.session.add(like46)
    db.session.add(like47)
    db.session.add(like48)
    db.session.add(like49)
    db.session.add(like50)
    db.session.add(like51)
    db.session.add(like52)
    db.session.add(like53)
    db.session.add(like54)
    db.session.add(like55)
    db.session.add(like56)
    db.session.add(like57)
    db.session.add(like58)
    db.session.add(like59)
    db.session.add(like60)
    db.session.add(like61)
    db.session.add(like62)
    db.session.add(like63)
    db.session.add(like64)
    db.session.add(like65)
    db.session.add(like66)
    db.session.add(like67)
    db.session.add(like68)
    db.session.add(like69)
    db.session.add(like70)
    db.session.add(like71)
    db.session.add(like72)
    db.session.add(like73)
    db.session.add(like74)
    db.session.add(like75)
    db.session.add(like76)
    db.session.add(like77)
    db.session.add(like78)
    db.session.add(like79)
    db.session.add(like80)
    db.session.add(like81)
    db.session.add(like82)
    db.session.add(like83)
    db.session.add(like84)
    db.session.add(like85)
    db.session.add(like86)
    db.session.add(like87)
    db.session.add(like88)
    db.session.add(like89)
    db.session.add(like90)
    db.session.add(like91)
    db.session.add(like92)
    db.session.add(like93)
    db.session.add(like94)
    db.session.add(like95)
    db.session.add(like96)
    db.session.add(like97)
    db.session.add(like98)
    db.session.add(like99)
    db.session.add(like100)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
