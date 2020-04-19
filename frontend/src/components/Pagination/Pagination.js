import React from "react";
import {Pagination} from "antd";
import {fetchArticleList} from '../../actions/data';
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        page: state.data.page,
        perPage: state.data.perPage,
        articleTotal: state.data.articleTotal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticleList: (page) => dispatch(fetchArticleList(page))
    }
};

const ArticlePagination = (props) => {

    const onChange = (page, pageSize) => {
        props.fetchArticleList(page);
    };

    console.log('what is page: '+props.page);

    return(
        <Pagination
            simple
            defaultPageSize={props.perPage}
            total={props.articleTotal}
            style={{textAlign: "center"}}
            onChange={onChange}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePagination);