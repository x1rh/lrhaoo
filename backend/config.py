import os
from datetime import timedelta


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_SENDER = os.getenv('MAIL_SENDER')

    ADMIN = os.getenv('ADMIN')

    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASS = os.getenv('DATABASE_PASS')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_NAME = os.getenv('DATABASE_NAME')

    SQLALCHEMY_TRACK_MODIFITIONS = False

    SQLALCHEMY_DATABASE_ENGINE = "mysql+pymysql://{username}:{password}@{hostname}:{port}".format(
        username=DATABASE_USER,
        password=DATABASE_PASS,
        hostname=DATABASE_HOST,
        port=DATABASE_PORT,
    )
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{username}:{password}@{hostname}:{port}/{database}".format(
        username=DATABASE_USER,
        password=DATABASE_PASS,
        hostname=DATABASE_HOST,
        port=DATABASE_PORT,
        database=DATABASE_NAME
    )

    REDIS_PASS = os.getenv('REDIS_PASS')
    REDIS_HOST = os.getenv('REDIS_HOST')
    REDIS_PORT = os.getenv('REDIS_PORT')

    ACCESS_EXPIRES = timedelta(minutes=int(os.getenv('ACCESS_EXPIRES')))
    REFRESH_EXPIRES = timedelta(days=int(os.getenv('REFRESH_EXPIRES')))


class DevelopmentConfig(Config):
    pass


class TestingConfig(Config):
    TESTING = True


class ProductionConfig(Config):
    pass


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}