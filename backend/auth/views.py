from . import auth_blueprint
from .. import revoked_store, jwt
from flask import jsonify, request, current_app
from backend import db
from backend.models import User
from flask_jwt_extended import (
    jwt_required, create_access_token, get_jwt_identity,
    create_refresh_token, jwt_refresh_token_required, get_jti, get_raw_jwt
)
from .forms import LoginForm, RegisterForm


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    user = User.query.filter_by(email=identity).first()
    return {
        'email': identity,
        'username': user.username,
        'uid': user.id
    }


@jwt.token_in_blacklist_loader
def check_if_token_is_revoked(decrypted_token):
    jti = decrypted_token['jti']
    entry = revoked_store.get(jti)
    if entry is None:
        return True
    return entry == 'true'


@auth_blueprint.route('/login', methods=['POST'])
def login():

    form = LoginForm(request.form)

    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data

        user = User.query.filter_by(email=email).first()

        if not user or not user.verify_password(password):
            return jsonify({"msg": "Bad username or password"}), 401

        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        access_jti = get_jti(encoded_token=access_token)
        refresh_jti = get_jti(encoded_token=refresh_token)
        revoked_store.set(access_jti, 'false', current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
        revoked_store.set(refresh_jti, 'false', current_app.config['JWT_REFRESH_TOKEN_EXPIRES'])

        return jsonify({
            'accessToken': access_token,
            'refreshToken': refresh_token,
        }), 201
    else:
        return jsonify({
            'err': form.errors
        }), 401


@auth_blueprint.route('/register', methods=['POST'])
def register():

    form = RegisterForm(request.form)

    if form.validate_on_submit():
        print('ok * 50')
        email = form.email.data
        username = form.username.data
        password = form.password.data
        verify_code = form.verify_code.data

        user = User.query.filter_by(email=email).first()

        if user:
            return jsonify({
                'err': 'already registered.'
            }), 403

        user = User(email=email, username=username, password=password)

        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        access_jti = get_jti(encoded_token=access_token)
        refresh_jti = get_jti(encoded_token=refresh_token)
        revoked_store.set(access_jti, 'false', current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
        revoked_store.set(refresh_jti, 'false', current_app.config['JWT_REFRESH_TOKEN_EXPIRES'])

        return jsonify({
            'accessToken': access_token,
            'refreshToken': refresh_token
        }), 201
    else:
        print('no' * 50)
        print(form.errors)
        return jsonify({
            'err': form.errors
        }), 401


# A blacklisted refresh tokens will not be able to access this endpoint
@auth_blueprint.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    access_jti = get_jti(encoded_token=access_token)
    revoked_store.set(access_jti, 'false', current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
    return jsonify({'accessToken': access_token}), 201


# Endpoint for revoking the current users access token
@auth_blueprint.route('/access_revoke', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    revoked_store.set(jti, 'true', current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
    return jsonify({"msg": "Access token revoked"}), 200


# Endpoint for revoking the current users refresh token
@auth_blueprint.route('/refresh_revoke', methods=['DELETE'])
@jwt_refresh_token_required
def logout2():
    jti = get_raw_jwt()['jti']
    revoked_store.set(jti, 'true', current_app.config['JWT_REFRESH_TOKEN_EXPIRES'])
    return jsonify({"msg": "Refresh token revoked"}), 200