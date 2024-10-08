"""empty message

Revision ID: 6a339c5cbdef
Revises: 2ce25d5c183c
Create Date: 2024-08-18 13:20:48.577779

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6a339c5cbdef'
down_revision = '2ce25d5c183c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sale', schema=None) as batch_op:
        batch_op.add_column(sa.Column('unit_price', sa.Float(), nullable=False))
        batch_op.drop_constraint('fk_sale_branch_id_branch', type_='foreignkey')
        batch_op.drop_column('branch_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sale', schema=None) as batch_op:
        batch_op.add_column(sa.Column('branch_id', mysql.INTEGER(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('fk_sale_branch_id_branch', 'branch', ['branch_id'], ['id'])
        batch_op.drop_column('unit_price')

    # ### end Alembic commands ###
