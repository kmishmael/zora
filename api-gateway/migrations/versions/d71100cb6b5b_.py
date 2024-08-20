"""empty message

Revision ID: d71100cb6b5b
Revises: b950c679eb0f
Create Date: 2024-08-20 15:09:15.793840

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd71100cb6b5b'
down_revision = 'b950c679eb0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('feedback', schema=None) as batch_op:
        batch_op.alter_column('sale_id',
               existing_type=mysql.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('feedback', schema=None) as batch_op:
        batch_op.alter_column('sale_id',
               existing_type=mysql.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
