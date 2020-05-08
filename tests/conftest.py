import pytest
from sqlalchemy import create_engine
from backend import create_app, db


@pytest.fixture
def app():
    app = create_app('testing')

    with app.app_context():
        engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
        engine.execute('create database {database} character set  UTF8MB4;'.format(
            database=app.config['TEST_DATABASE_NAME']
        ))
        db.create_all()

    yield app

    with app.app_context():
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
        self.access_token = None
        self.refresh_token = None

    def login(self, username, password):
        response = self._client.post(
            "auth/login",
            data={
                "email": 'lrhaoo@example.com',
                "password": 'iwonttellyoumypassword'
            }
        )
        print(response)
        return response

    def logout(self):
        return self._client.delete("/auth/logout")


@pytest.fixture
def auth(client):
    return AuthActions(client)





