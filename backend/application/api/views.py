from . import api_blueprint
from flask import jsonify, request, abort
from backend.application import db
from ..models import Article, Tag, User, Comment, Reply
from flask_jwt_extended import jwt_required


@api_blueprint.route('/article/<int:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if not article:
        abort(404)

    pagination = article.comments.paginate(
        page=1,
        per_page=5,
        error_out=False
    )
    comments = pagination.items

    return jsonify({
        'article': {
            'title': article.title,
            'article_id': article.id,
            'content': article.content
        },

        'page': pagination.page,
        'per_page': pagination.per_page,
        'total': pagination.total,
        'comments': [comment.json() for comment in comments]
    })


@api_blueprint.route('/get_tags', methods=['GET'])
def get_tags():
    tags = Tag.query.all()
    if not tags:
        abort(404)
    return jsonify({
        'tags': [x.json() for x in tags]
    })


@api_blueprint.route('/article_paginate/<int:tag_id>/<int:page>', methods=['GET'])
def article_paginate_by_tag(tag_id, page):
    if tag_id == 0:
        pagination = Article.query.paginate(
            page=page,
            per_page=3,
            error_out=False
        )
    else:
        category = Tag.query.filter_by(id=tag_id).first()
        pagination = category.articles.paginate(
            page=page,
            per_page=3,
            error_out=False
        )
    articles = pagination.items

    return jsonify({
        'page': pagination.page,
        'perPage': pagination.per_page,
        'total': pagination.total,
        'articles': [article.simple_json() for article in articles]
    })


@api_blueprint.route('/comment_paginate/<int:article_id>/<int:page>', methods=['GET'])
def comment_paginate(article_id, page):
    article = Article.query.filter_by(id=article_id).first()

    if not article:
        abort(404)

    pagination = article.comments.order_by(Comment.timestamp.desc()).paginate(
        page=page,
        per_page=5,
        error_out=False
    )
    comments = pagination.items

    return jsonify({
        'page': pagination.page,
        'per_page': pagination.per_page,
        'total': pagination.total,
        'comments': [comment.json() for comment in comments]
    })


@api_blueprint.route('/make_a_comment', methods=['POST'])
@jwt_required
def make_a_comment():
    article_id = request.form.get('article_id')
    uid = request.form.get('uid')
    comment_content = request.form.get('comment')

    article = Article.query.filter_by(id=article_id).first()
    user = User.query.filter_by(id=uid).first()

    if not article or not user:
        abort(404)

    comment = Comment(content=comment_content, article=article, user=user)
    db.session.add(comment)
    db.session.commit()

    return jsonify({
        'msg': 'ok'
    }), 200


@api_blueprint.route('/get_reply_list/<int:comment_id>', methods=['GET'])
@jwt_required
def get_reply(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()
    if not comment:
        abort(404)

    return jsonify({
        'replies': [_.json() for _ in comment.replies]
    })


@api_blueprint.route('/make_a_reply', methods=['POST'])
@jwt_required
def make_a_reply():
    comment_id = request.form.get('commentID')
    from_uid = request.form.get('fromUser')
    to_uid = request.form.get('toUser')
    reply_content = request.form.get('replyContent')

    comment = Comment.query.filter_by(id=comment_id).first()
    if not comment:
        abort(404)

    from_user = User.query.filter_by(id=from_uid).first()
    if not from_user:
        abort(404)

    to_user = User.query.filter_by(id=to_uid).first()
    if not to_user:
        abort(404)

    if not reply_content:
        abort(404)

    reply = Reply(from_user=from_user, to_user=to_user, comment=comment, content=reply_content)

    db.session.add(reply)
    db.session.commit()

    return jsonify({
        'msg': 'ok'
    }), 200


@api_blueprint.route('/test', methods=['GET'])
def test():
    return 'test', 200

