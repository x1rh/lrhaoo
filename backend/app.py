import click
from sqlalchemy import create_engine
from backend import create_app, db, revoked_store, config
from backend.models import Article, Category, Comment, Reply, Role, User
from random import randint
from faker import Faker

app = create_app()
fake = Faker('zh-CN')


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
    ul = list()
    for i in range(20):
        u = User(email=fake.email(), password=fake.pystr(6, 16), username=fake.name())
        db.session.add(u)
        ul.append(u)
    # u1 = User(email='123@qq.com', password='123', username='u1')
    # u2 = User(email='456@qq.com', password='456', username='u2')
    # u3 = User(email='789@qq.com', password='789', username='u3')
    # db.session.add(u1)
    # db.session.add(u2)
    # db.session.add(u3)

    click.echo('mock db> insert articles...')
    a1 = Article(
        title='title 1',
        content='''
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

vector<int> make_vec(int n, int a, int b){
    vector<int> v;
    for(int i=0; i<n; ++i+){
        v.push_back(i);
        if(i == a){
            for(int j=0; j<b; ++j){
                v.push_back(i);
            }
        }
    }
}

void print(vector<int>& v){
    for(int i=0; i<v.size(); ++i){
        cout<<v[i]<<" ";
    }
    cout<<endl;
}

int main(){
    int a, b, n;
    cin>>a>>b>>n;
    vector<int> res = make_vec(n, a, b);
    print(res);
    return 0;
}
```

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

## what about a picture?
![it's a picture](http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim)

## todolist
- [ ] need to be done
- [x] finished..


---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
'''
    )

    db.session.add(a1)

    fake_comment_content = u'蚂蚁蚂蚁蚂蚁蚂蚁蝗虫的大腿, 蚂蚁蚂蚁蚂蚁蚂蚁蜻蜓的眼睛, ' \
                           '蚂蚁蚂蚁蚂蚁蚂蚁蝴蝶的翅膀, 蚂蚁蚂蚁蚂蚁蚂蚁蚂蚁没问题'
    fake_reply_content = u'天底下不多不少两亩三分地, 冬天不种夏天还不长东西'

    for i in range(2, 33):
        ta = Article(title='title '+str(i), content=a1.content)
        for j in range(10):
            tc = Comment(
                content=fake_comment_content,
                likes=randint(0, 100),
                article=ta,
                user=ul[randint(0, 19)]
            )
            for k in range(10):
                tr = Reply(
                    content=fake_reply_content,
                    likes=randint(0, 100),
                    comment=tc,
                    from_user=ul[randint(0, 19)],
                    to_user=ul[randint(0, 19)]
                )
                db.session.add(tr)
            db.session.add(tc)
        db.session.add(ta)

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
        revoked_store=revoked_store,
        Article=Article
    )
