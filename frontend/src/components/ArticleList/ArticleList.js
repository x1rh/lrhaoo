import React from "react";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import ArticlePagination from "../Pagination/Pagination";
import {fetchArticleList} from "../../actions/data";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.data.articles,

        page: state.data.page,
        perPage: state.data.perPage,
        articleTotal: state.data.articleTotal
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchArticleList: (page, category_id) => dispatch(fetchArticleList(page, category_id))
    });
};


class ArticleList extends React.Component {

    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchArticleList(1);
    }

    onPaginationChange = (page, pageSize, category_id) => {
        this.props.fetchArticleList(page, category_id);
    };

    render() {
        return (
            <>
                {
                    this.props.articles ?
                    this.props.articles.map(article => {
                        return <ArticleListItem article={article}/>
                    }) : ''
                }
                <ArticlePagination
                    defaultPageSize={this.props.perPage}
                    total={this.props.articleTotal}
                    style={{textAlign: "center"}}
                    onChange={this.onPaginationChange}
                />
            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);