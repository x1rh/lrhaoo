import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import ArticleListItem from "../ArticleListItem/ArticleListItem";
import Pagination from "../Pagination/Pagination";


class ArticleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            page: 1,
            perPage: 1,
            total: 1,
        };
        this.fetchArticleList = this.fetchArticleList.bind(this);
    }

    fetchArticleList = (tagID, page) => {
        const url = '/api/article_paginate/' + tagID + '/' + page;
        axios.get(url)
            .then(response => response.data)
            .then(response => {
                this.setState({
                    articles: response.articles,
                    page: response.page,
                    perPage: response.perPage,
                    total: response.total,
                })
            })
    };

    componentDidMount() {
        this.fetchArticleList(this.props.tagID, 1);
    }

    render() {
        return (
            <>
                {
                    this.state.articles ?
                        this.state.articles.map(article => {
                            return <ArticleListItem article={article}/>
                        }) : ''
                }
                <Pagination
                    defaultPageSize={this.state.perPage}
                    total={this.state.total}
                    pageSize={this.state.perPage}
                    style={{textAlign: "center"}}
                    onChange={(page, pageSize) => this.fetchArticleList(this.props.tagID, page)}
                />
            </>
        )
    }

}

ArticleList.propTypes = {
    tagID: PropTypes.number,
    // articles: PropTypes.arrayOf(PropTypes.shape({
    //     title: PropTypes.string,
    //     timestamp: PropTypes.string,
    //     description: PropTypes.string,
    //     articleID: PropTypes.number
    // })),
};

ArticleList.defaultProps = {
    tagID: 0
};

export default ArticleList;
