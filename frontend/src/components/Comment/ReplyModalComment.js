import React, {createElement} from "react";
import {connect} from 'react-redux';
import moment from "moment";

import {Avatar, Comment as CMM, message, Tooltip} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined} from "@ant-design/icons";

import InlineComment from "./InlineComment";
import {postReply} from "../../actions/data";

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postReply: (commentID, fromUser, toUser, replyContent) => dispatch(postReply(
            commentID,
            fromUser,
            toUser,
            replyContent
        ))
    }
};


class ReplyModalComment extends React.Component {

    constructor(props) {
        super(props);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.onInlineCommentChange = this.onInlineCommentChange.bind(this);
        this.onInlineCommentClick = this.onInlineCommentClick.bind(this);
    }


    state = {
        likes: 0,
        dislikes: 0,
        action: null,
        inlineCommentVisible: false,
        inlineCommentValue: '',
        isSubmitting: false,
    };


    like() {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked'
        })
    }

    dislike() {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked'
        })
    }

    onInlineCommentClick() {
        this.setState({
            isSubmitting: true
        });
        this.props.postReply(
            this.props.commentID,
            this.props.uid,
            this.props.data.fromUser.uid,
            this.state.inlineCommentValue
        ).then(res => {
            setTimeout(() => {
                this.setState({
                    inlineCommentValue: '',
                    isSubmitting: false
                });
                message.info('评论发表成功');
            }, 1000)
        })
    }

    onInlineCommentChange(e) {
        this.setState({
            inlineCommentValue: e.target.value
        })
    }

    render() {

        const actions = [
            <span key="comment-basic-like">
            <Tooltip title="Like">
            {createElement(this.state.action === 'liked' ? LikeFilled : LikeOutlined, {
                onClick: this.like,
            })}
            </Tooltip>
            <span className="comment-action">{this.state.likes}</span>
        </span>,

            <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
            {React.createElement(this.state.action === 'disliked' ? DislikeFilled : DislikeOutlined, {
                onClick: this.dislike,
            })}
            </Tooltip>
        <span className="comment-action">{this.state.dislikes}</span>
        </span>,
            <span key="comment-basic-reply-to" onClick={() => {
                this.setState({
                    inlineCommentVisible: !this.state.inlineCommentVisible
                })
            }}>
                {this.state.inlineCommentVisible ? '取消回复' : '回复'}
        </span>,
        ];

        const {fromUser, toUser, content, timestamp} = this.props.data;


        return (
            <>
                <CMM
                    actions={actions}
                    author={<><a>{fromUser.username}</a> 回复 <a>{toUser.username}</a></>}
                    avatar={
                        fromUser.avatar ?
                            <Avatar
                                src={fromUser.avatar.src}
                                alt={fromUser.avatar.alt}
                            /> :
                            <Avatar icon={<UserOutlined/>}/>
                    }
                    content={
                        <p>
                            {content}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(timestamp).fromNow()}</span>
                        </Tooltip>
                    }
                />
                {this.state.inlineCommentVisible ?
                    (
                        <InlineComment
                            username={fromUser.username}
                            onClick={this.onInlineCommentClick}
                            onChange={this.onInlineCommentChange}
                            value={this.state.inlineCommentValue}
                            isSubmitting={this.state.isSubmitting}
                        />
                    ) : ''
                }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyModalComment);