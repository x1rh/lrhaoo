import pytest


def test_register(client, app):
    assert client.get('/auth/register').status_code == 405  # method not allowed
    response = client.post(
        '/auth/register',
        data={
            'email': 'lrhaoo@example.com',
            'username': 'lrhaoo',
            'password': 'iwonttellyoumypassword'
        }
    )
    assert response.status_code == 201


def test_login(client, auth):
    assert client.get('/auth/login').status_code == 405   # method not allowed


@pytest.mark.parametrize(
    # todo: test cases aren't contain all situations
    ('email', 'username', 'password', 'message'),
    (
        ('', '', '', b'email is required.'),
        ('a', '', '', b'username is required.'),
        ('a', 'a', '', b'password is required.'),
        # ('lrhaoo@gmail.com', 'lrhaoo', 'iwonttellyoumypassword', b'already registered.'),
    )
)
def test_register_validate_input(client, email, username, password, message):
    response = client.post(
        '/auth/register',
        data={
            'email': email,
            'username': username,
            'password': password,
        }
    )
    assert message in response.data




