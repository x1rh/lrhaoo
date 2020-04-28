from . import api_blueprint
from flask import jsonify,request, abort
from ..models import Article, Category


@api_blueprint.route('/article/<int:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = Article.query.filter_by(id=article_id).first()

    if article:
        return jsonify({
            'title': article.title,
            'content': article.content
        })
    else:
        abort(404)


@api_blueprint.route('/article_paginate_by_default/<int:page>', methods=['GET'])
def article_paginate_by_default(page):
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


@api_blueprint.route('/get_categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    if not categories:
        abort(404)
    return jsonify({
        categories: [x.json() for x in categories]
    })


@api_blueprint.route('/article_paginate_by_category/<int:category_id>/<int:page>', methods=['GET'])
def article_paginate_by_category(category_id, page):
    category = Category.query.filter_by(id=category_id).first()

    if not category:
        abort(404)

    pagination = category.articles.paginate(
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


@api_blueprint.route('/comment_paginate/<int:article_id>/<int:page>', methods=['GET'])
def comment_paginate(article_id, page):
    article = Article.query.filter_by(id=article_id).first()

    if not article:
        abort(404)

    pagination = article.comments.paginate(
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


