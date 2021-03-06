"""empty message

Revision ID: c3742f5da723
Revises: f7205b1362a6
Create Date: 2021-11-16 10:00:11.185778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3742f5da723'
down_revision = 'f7205b1362a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'follows', 'users', ['following_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'follows', type_='foreignkey')
    # ### end Alembic commands ###
