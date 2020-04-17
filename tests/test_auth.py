import pytest


def test_register(client, app):
    # todo:
    assert client.get('/auth/register').status_code == 200
    response = client.post(
        '/auth/register',
        data={
            'username': '',
            'password': ''
        }
    )
    assert 'http://localhost/auth/login' == response.headers['location']

    with app.app_context():
        assert (

        )


@pytest.mark.parametrize(
    # todo
    ('username', 'password', 'message'),
    (
        ('', '', b'username is required.'),
        ('a', '', b'password is required.'),
        ('test@gmail.com', '123456', b'already registered'),
        ('test', '123456', b'invalid email'),
    )
)
def test_register_validate_input(client, username, password, message):
    response = client.post(
        '/auth/register',
        data={
            'username': username,
            'password': password,
        }
    )
    assert message in response.data


def test_login(client, auth):
    assert client.get('/auth/login').status_code == 200

