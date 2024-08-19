"""empty message

Revision ID: 2786d62e7bf3
Revises: d0c58931cc6d
Create Date: 2024-08-18 14:23:33.435064

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2786d62e7bf3'
down_revision = 'd0c58931cc6d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performance_goal', schema=None) as batch_op:
        batch_op.add_column(sa.Column('incentive_amount', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performance_goal', schema=None) as batch_op:
        batch_op.drop_column('incentive_amount')

    # ### end Alembic commands ###
