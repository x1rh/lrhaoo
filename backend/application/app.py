import click
from sqlalchemy import create_engine
from backend.application import create_app, db, revoked_store, config
from backend.application.models import Article, Tag, Comment, Reply, Role, User

app = create_app()


@app.cli.command('initdb')
def initdb():
    click.echo('init db...')
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
    engine.execute(f'create database {app.config["DATABASE_NAME"]} character set utf8mb4;')
    db.create_all()


@app.cli.command('dropdb')
def dropdb():
    click.echo('drop db...')
    db.drop_all()
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
    engine.execute(f'drop database {app.config["DATABASE_NAME"]};')


@app.shell_context_processor
def make_shell_context():
    return dict(
        config=config.config,
        revoked_store=revoked_store,
        Article=Article,
        User=User,
        Tag=Tag,
        Comment=Comment,
        Reply=Reply,
        Role=Role,
        db=db
    )


with app.app_context():
    from . import mock_data

