"""empty message

Revision ID: 528f70b852aa
Revises: b5280eb033ca
Create Date: 2024-08-12 01:30:57.842641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '528f70b852aa'
down_revision = 'b5280eb033ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('branch', schema=None) as batch_op:
        batch_op.drop_index('uq_branch_name')

    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_index('uq_product_name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.create_index('uq_product_name', ['name'], unique=True)

    with op.batch_alter_table('branch', schema=None) as batch_op:
        batch_op.create_index('uq_branch_name', ['name'], unique=True)

    # ### end Alembic commands ###
