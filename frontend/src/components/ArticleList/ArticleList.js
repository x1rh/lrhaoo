import React from "react";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticlePagination from "../Pagination/Pagination";
import {fetchArticleList} from "../../actions/data";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.data.articles
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchArticleList: (page) => dispatch(fetchArticleList(page))
    });
};


class ArticleList extends React.Component {

    componentDidMount() {
        this.props.fetchArticleList(1);
    }

    render() {
        return (
            <>
                {
                    this.props.articles ?
                    this.props.articles.map(article => {
                        return <ArticleListItem article={article}/>
                    }) : ''
                }
                <ArticlePagination/>
            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);