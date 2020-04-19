from . import api_blueprint
from flask import jsonify,request
from ..models import Article


@api_blueprint.route('/article/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = Article.query.filter_by(id=article_id).first()

    return jsonify({
        'title': article.title,
        'content': article.content
    })


@api_blueprint.route('/article_paginate/<int:page>', methods=['GET'])
def article_paginate(page):
    pagination = Article.query.paginate(
        page=page,
        per_page=3,
        error_out=False
    )
    articles = pagination.items
    return jsonify({
        'page': pagination.page,
        'per_page': pagination.per_page,
        'total': pagination.total,
        'articles': [article.simple_json() for article in articles]
    })
