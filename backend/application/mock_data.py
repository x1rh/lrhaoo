import os
import click
from backend.application import db
from backend.application.models import Article, Tag, Comment, Reply, Role, User
from random import randint
from faker import Faker
from .app import app

fake = Faker('zh-CN')

basedir = os.path.abspath('..')
data_path = os.path.join(basedir, 'data')
markdown_path = os.path.join(data_path, 'markdown')


def read_markdown(directory, filename):
    file_full_path = os.path.join(directory, filename)
    with open(file_full_path) as inf:
        return inf.read()


@app.cli.command('mockdb')
def mockdb():
    click.echo('mock db> insert roles...')
    Role.insert_roles()

    click.echo('mock db> insert tags')
    Tag.insert_tags()

    click.echo('mock db> insert users...')
    ul = list()
    for i in range(20):
        u = User(email=fake.email(), password=fake.pystr(6, 16), username=fake.name())
        db.session.add(u)
        ul.append(u)

    click.echo('mock db> insert articles...')
    a1 = Article(
        title='title 1',
        content=read_markdown(markdown_path, 'mock_article.md')
    )

    db.session.add(a1)

    fake_comment_content = u'蚂蚁蚂蚁蚂蚁蚂蚁蝗虫的大腿, 蚂蚁蚂蚁蚂蚁蚂蚁蜻蜓的眼睛, ' \
                           '蚂蚁蚂蚁蚂蚁蚂蚁蝴蝶的翅膀, 蚂蚁蚂蚁蚂蚁蚂蚁蚂蚁没问题'
    fake_reply_content = u'天底下不多不少两亩三分地, 冬天不种夏天还不长东西'

    tags = Tag.query.all()

    for each in tags:
        if randint(0, 1) == 1:
            a1.tags.append(each)

    for i in range(10):
        tc = Comment(
            content=str(i) + fake_comment_content,
            likes=randint(0, 100),
            article=a1,
            user=ul[randint(0, 19)]
        )
        for j in range(10):
            tr = Reply(
                content=str(j) + fake_reply_content,
                likes=randint(0, 100),
                comment=tc,
                from_user=ul[randint(0, 19)],
                to_user=ul[randint(0, 19)]
            )
            db.session.add(tr)
        db.session.add(tc)
    db.session.add(a1)

    for i in range(2, 33):
        ta = Article(title='title '+str(i), content=a1.content)

        for each in tags:
            if randint(0, 1) == 1:
                ta.tags.append(each)

        for j in range(10):
            tc = Comment(
                content=str(j)+fake_comment_content,
                likes=randint(0, 100),
                article=ta,
                user=ul[randint(0, 19)]
            )
            for k in range(10):
                tr = Reply(
                    content=str(k)+fake_reply_content,
                    likes=randint(0, 100),
                    comment=tc,
                    from_user=ul[randint(0, 19)],
                    to_user=ul[randint(0, 19)]
                )
                db.session.add(tr)
            db.session.add(tc)
        db.session.add(ta)
    db.session.commit()
