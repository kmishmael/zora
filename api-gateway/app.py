from flask import Flask
from config import Config
from db.database import db, bcrypt, login_manager
from flask_migrate import Migrate
from models.models import User

migrate = Migrate()


def create_app():
    app = Flask(__name__)

    login_manager.init_app(app)

    app.config.from_object(Config)
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    def _fk_pragma_on_connect(dbapi_con, con_record):  # noqa
        dbapi_con.execute('pragma foreign_keys=ON')

    with app.app_context():
        db.create_all()

        from routes.routes import main_bp
        from routes.auth import auth_bp
        from routes.branch import branch_bp
        from routes.category import category_bp
        from routes.commission import commission_bp
        from routes.feedback import feedback_bp
        from routes.incentive import incentive_bp
        from routes.performance import performance_bp
        from routes.product import product_bp
        from routes.product_images import product_images_bp
        from routes.sales import sales_bp
        from routes.user import user_bp
        app.register_blueprint(main_bp)
        app.register_blueprint(auth_bp)
        app.register_blueprint(branch_bp)
        app.register_blueprint(category_bp)
        app.register_blueprint(commission_bp)
        app.register_blueprint(feedback_bp)
        app.register_blueprint(incentive_bp)
        app.register_blueprint(performance_bp)
        app.register_blueprint(product_bp)
        app.register_blueprint(product_images_bp)
        app.register_blueprint(sales_bp)
        app.register_blueprint(user_bp)

        from sqlalchemy import event
        event.listen(db.engine, 'connect', _fk_pragma_on_connect)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()
