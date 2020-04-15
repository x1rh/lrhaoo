import click
from sqlalchemy import create_engine
from backend import create_app, db, revoked_store, config
from backend.models import Article, Category, Comment, Reply, Role, User

app = create_app()


@app.cli.command('initdb')
def initdb():
    click.echo('init db...')
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
    engine.execute('create database {database} character set utf8;'.format(
        database=app.config['DATABASE_NAME']
    ))
    db.create_all()


@app.cli.command('mockdb')
def mockdb():
    click.echo('mock db> insert roles...')
    Role.insert_roles()

    click.echo('mock db> insert categories')
    Category.insert_categories()

    click.echo('mock db> insert users...')
    u1 = User(email='123@qq.com', password='123', username='u1')
    u2 = User(email='456@qq.com', password='456', username='u2')
    u3 = User(email='789@qq.com', password='789', username='u3')
    db.session.add(u1)
    db.session.add(u2)
    db.session.add(u3)

    click.echo('mock db> insert articles...')
    a1 = Article(title='test title', content='I love dog')
    db.session.add(a1)

    db.session.commit()


@app.cli.command('dropdb')
def dropdb():
    click.echo('drop db...')
    db.drop_all()
    engine = create_engine(app.config['SQLALCHEMY_DATABASE_ENGINE'])
    engine.execute('drop database {database};'.format(
        database=app.config['DATABASE_NAME']
    ))


@app.shell_context_processor
def make_shell_context():
    return dict(
        config=config.config,
        revoked_store=revoked_store
    )
