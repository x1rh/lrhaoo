import React from "react";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        articles: state.data.articles
    }
};

const ArticleList = (props) => {
    const articles = props.articles;
    return(
        articles?
        articles.map(article => {
            return <ArticleListItem article={article}/>
        }):''
    )
};

export default connect(mapStateToProps)(ArticleList);