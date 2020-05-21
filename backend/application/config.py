import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

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

    REDIS_PASS = os.getenv('REDIS_PASS')
    REDIS_HOST = os.getenv('REDIS_HOST')
    REDIS_PORT = os.getenv('REDIS_PORT')

    WTF_CSRF_ENABLED = False
    WTF_CSRF_CHECK_DEFAULT = False

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES')))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES')))


class DevelopmentConfig(Config):
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASS = os.getenv('DATABASE_PASS')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_NAME = os.getenv('DATABASE_NAME')

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


class TestingConfig(Config):
    TESTING = True
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASS = os.getenv('DATABASE_PASS')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_NAME = os.getenv('TEST_DATABASE_NAME')
    TEST_DATABASE_NAME = DATABASE_NAME

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


class ProductionConfig(Config):
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASS = os.getenv('DATABASE_PASS')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_PORT = os.getenv('DATABASE_PORT')
    DATABASE_NAME = os.getenv('DATABASE_NAME')

    SQLALCHEMY_TRACK_MODIFITIONS = False

    SQLALCHEMY_DATABASE_ENGINE = "mysql+pymysql://{username}:{password}@{hostname}:{port}".format(
        username=DATABASE_USER,
        password=DATABASE_PASS,
        hostname='mysql',
        port=DATABASE_PORT,
    )
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{username}:{password}@{hostname}:{port}/{database}".format(
        username=DATABASE_USER,
        password=DATABASE_PASS,
        hostname='mysql',
        port=DATABASE_PORT,
        database=DATABASE_NAME
    )


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}