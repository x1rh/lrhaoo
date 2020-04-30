import React from "react";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import Pagination from "../Pagination/Pagination";
import {fetchArticleList} from "../../actions/data";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.data.articles,

        page: state.data.page,
        perPage: state.data.perPage,
        total: state.data.total
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
                <Pagination
                    defaultPageSize={this.props.perPage}
                    total={this.props.total}
                    pageSize={this.props.perPage}
                    style={{textAlign: "center"}}
                    onChange={this.onPaginationChange}
                />
            </>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);