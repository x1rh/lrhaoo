import pytest


def test_register(client):
    assert client.get('/auth/register').status_code == 405  # method not allowed
    response = client.post(
        '/auth/register',
        data={
            'email': 'lrhaoo@example.com',
            'username': 'lrhaoo',
            'password': 'iwonttellyoumypassword',
            'verify_code': '2333'
        }
    )
    assert response.status_code == 201


def test_login(client):
    assert client.get('/auth/login').status_code == 405   # method not allowed
    # response = client.post(
    #     '/auth/login',
    #     data={
    #         'email': 'lrhaoo@example.com',
    #         'password': 'iwonttellyoumypassword'
    #     }
    # )
    # assert response.status_code == 201


@pytest.mark.parametrize(
    # todo: test cases aren't contain all situation.
    ('email', 'password', 'message'),
    (
        ('', '', b'email is required'),
        ('a', '', b'password is required'),
        ('a', 'b', b'invalid email address'),
        ('a@e.com', 'b', b'invalid length')
    )
)
def test_login_validate_input(client, email, password, message):
    response = client.post(
        '/auth/login',
        data={
            'email': email,
            'password': password,
        }
    )
    assert message in response.data


@pytest.mark.parametrize(
    # todo: test cases aren't contain all situations
    ('email', 'username', 'password', 'verify_code', 'message'),
    (
        ('', '', '', '', b'email is required'),
        ('a', '', '', '', b'username is required'),
        ('a', 'a', '', '', b'password is required'),
        ('a', 'a', 'a', '', b'verify code is required')
        # ('lrhaoo@gmail.com', 'lrhaoo', 'iwonttellyoumypassword', '1', b'already registered.'),
    )
)
def test_register_validate_input(client, email, username, password, verify_code, message):
    response = client.post(
        '/auth/register',
        data={
            'email': email,
            'username': username,
            'password': password,
            'verify_code': verify_code
        }
    )
    assert message in response.data




