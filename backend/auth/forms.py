from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Length, Email, Regexp


class LoginForm(FlaskForm):
    email = StringField(
        'email',
        validators=[
            DataRequired(message='email is required'),
            Length(1, 64, message='invalid length'),
            Email(message='invalid email address')
        ]
    )
    password = PasswordField(
        'password',
        validators=[
            DataRequired('password is required'),
            Length(6, 64, message='invalid length')
        ]
    )


class RegisterForm(FlaskForm):
    email = StringField(
        'email',
        validators=[
            DataRequired(message='email is required'),
            Length(1, 64, message='invalid length'),
            Email(message='invalid email address')
        ]
    )
    username = StringField(
        'username',
        validators=[
            DataRequired(message='username is required'),
            Length(1, 64, message='invalid length'),
            Regexp(
                '^[a-zA-Z0-9\u4E00-\u9FA5]{1,128}$',
                flags=0,
                message=u'用户名只能包含下划线，数字，字母，中文'
            )
        ]
    )
    password = PasswordField(
        'password',
        validators=[
            DataRequired(message='password is required'),
            Length(6, 64, message='invalid length')
        ]
    )
    verify_code = StringField(
        'verify_code',
        validators=[
            DataRequired(message='verify code is required')
        ]
    )
