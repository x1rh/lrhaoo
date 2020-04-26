import pytest
from sqlalchemy import create_engine
from backend import create_app, db


@pytest.fixture
def app():
    app = create_app('testing')

    engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
    engine.execute('create database {database} character set utf8;'.format(
        database=app.config['TEST_DATABASE_NAME']
    ))
    db.create_all()

    with app.app_context():
        pass

    yield app

    db.drop_all()
    engine.execute('drop database {database};'.format(
        database=app.config['TEST_DATABASE_NAME']
    ))


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username, password):
        return self._client.post(
            "auth/login",
            data={
                "username": username,
                "password": password
            }
        )

    def logout(self):
        return


@pytest.fixture
def auth(client):
    return AuthActions(client)





