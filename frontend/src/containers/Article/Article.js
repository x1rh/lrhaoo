import React from "react";
import ReactMarkdown from "react-markdown";
import {withRouter} from 'react-router-dom';
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import remarkToc from "remark-toc";
import Comment from "../../components/Comment/Comment";
import {List, message} from "antd";
import {connect} from 'react-redux';

import './Article.css';
import Pagination from "../../components/Pagination/Pagination";
import CommentEditor from "../../components/Comment/CommentEditor";
import {authenticate} from "../../actions/auth";
import {fetchArticle, fetchCommentList, postComment} from "../../actions/data";


require('github-markdown-css');


const mapStateToProps = state => {
    return {
        page: state.data.page,
        perPage: state.data.perPage,
        total: state.data.total,

        article: state.data.article,
        comments: state.data.comments,

        uid: state.auth.uid,

        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (accessToken, refreshToken, history, flag) => dispatch(authenticate(
            accessToken,
            refreshToken,
            history,
            flag
        )),
        fetchArticle: (article_id) => dispatch(fetchArticle(article_id)),
        fetchCommentList: (article_id, page) => dispatch(fetchCommentList(article_id, page)),
        postComment: (article_id, uid, comment) => dispatch(postComment(article_id, uid, comment))
    }
};


class Article extends React.Component {

    componentDidMount() {
        const article_id = this.props.history.location.pathname.split('/').slice(-1)[0];
        this.props.fetchArticle(article_id);
    }

    state = {
        commentValue: '',
        isSubmitting: false
    };

    handleSubmit = () => {
        if (!this.state.commentValue) {
            return;
        }

        this.setState({
            isSubmitting: true
        });

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        this.props.authenticate(
            accessToken,
            refreshToken,
            this.props.history,
            true
        );

            // .then(
            this.props.postComment(
                this.props.article.article_id,
                this.props.uid,
                this.state.commentValue
            // )
        ).then(res => {
            this.props.fetchCommentList(this.props.article.article_id, 1)
        }).then(
            setTimeout(() => {
                this.setState({
                    commentValue: '',
                    isSubmitting: false
                });
                message.info('评论发表成功');
            }, 1000)
        ).catch(err => {
            console.log('what is err');
            console.log(err);
        })


    };

    handleChange = e => {
        this.setState({
            commentValue: e.target.value,
        });
        if (!this.props.isAuthenticated) {
            message.info(
                <>
                    请先
                    <a href='/login'>登录</a>,
                    否则输入的信息会丢失
                </>
            )
        }
    };

    render() {
        return (
            <>
                <div className='markdown-body'>
                    <ReactMarkdown
                        source={this.props.article ? this.props.article.content : ''}
                        renderers={{code: CodeBlock}}
                        skipHtml={false}
                        escapeHtml={false}
                        plugins={[remarkToc]}
                    />
                </div>
                <div className="comment-area">
                    <List
                        className="comment-list"
                        header={`${this.props.total} 评论`}
                        itemLayout="horizontal"
                        dataSource={this.props.comments ? this.props.comments : []}
                        renderItem={item => (
                            <li>
                                <Comment data={item}/>
                            </li>
                        )}
                    />

                    <CommentEditor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        disabled={!this.props.isAuthenticated}
                        submitting={this.state.isSubmitting}
                        value={this.state.commentValue}
                    />

                    <div className="comment-pagination">
                        {
                            this.props.total ?
                                <Pagination
                                    defaultPageSize={this.props.perPage}
                                    pageSize={this.props.perPage}
                                    total={this.props.total}
                                    style={{textAlign: "center"}}
                                    onChange={(page, pageSize) => {
                                        this.props.fetchCommentList(this.props.article.article_id, page)
                                    }}
                                /> : ''
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Article));

