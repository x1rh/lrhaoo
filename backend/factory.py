import os
import redis
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from .config import config

db = SQLAlchemy()
jwt = JWTManager()
config = config[os.getenv('FLASK_ENV')]
revoked_store = redis.StrictRedis(
    host=getattr(config, 'REDIS_HOST'),
    port=getattr(config, 'REDIS_PORT'),
    db=0,
    decode_responses=True
)


def create_app():

    app = Flask(__name__)
    db.init_app(app)
    jwt.init_app(app)
    app.config.from_object(config)

    from .api import api_blueprint
    from .auth import auth_blueprint
    app.register_blueprint(api_blueprint)
    app.register_blueprint(auth_blueprint)

    return app


