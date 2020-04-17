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


@api_blueprint.route('/article_paginate/<int:page_id>', methods=['GET'])
def article_paginate(page_id):
    page = request.args.get('page', 1, type=int)
    pagination = Article.query.paginate(
        page=page,
        per_page=3,
        error_out=False
    )
    articles = pagination.items
    return jsonify({
        'count': pagination.total,
        'articles': [article.json() for article in articles]
    })
