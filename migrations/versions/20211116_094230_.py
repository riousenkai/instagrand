"""empty message

Revision ID: 0396becfca6e
Revises: ffdc0a98111c
Create Date: 2021-11-16 09:42:30.093146

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0396becfca6e'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('image_url', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('description', sa.String(length=300), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'description')
    op.drop_column('users', 'image_url')
    # ### end Alembic commands ###
