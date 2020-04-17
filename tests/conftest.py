import pytest

from backend import create_app


@pytest.fixture
def app():
    app = create_app('testing')

    with app.app_context():
        # do something with db
        pass

    yield app

    # close db


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


