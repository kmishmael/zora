import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    uri = f"mysql://{os.getenv("DATABASE_USER")}:{os.getenv(
        "DATABASE_PASSWORD")}@{os.getenv("DATABASE_HOST")}/{os.getenv("DATABASE_NAME")}"
    SQLALCHEMY_DATABASE_URI = uri
    # 'sqlite:///' + \
    #   os.path.join(basedir, 'app.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)
