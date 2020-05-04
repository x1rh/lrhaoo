import React, {createElement, useState} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';

import {Comment as CMM, Tooltip, Avatar, message} from 'antd';
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined} from '@ant-design/icons';

import ReplyModal from "./ReplyModal";
import InlineComment from "./InlineComment";

import {fetchReplyList, postReply} from "../../actions/data";


const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchReplyList: (commentID) => dispatch(fetchReplyList(commentID)),
        postReply: (commentID, fromUser, toUser, replyContent) => dispatch(postReply(
            commentID,
            fromUser,
            toUser,
            replyContent
        ))
    }
};

const Comment = (props) => {

    console.log('what is props.data:');
    console.log(props.data);

    const {avatar, username, content, commentID, commentOwnerID} = props.data;

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [inlineCommentValue, setInlineCommentValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <span key="comment-basic-like">
            <Tooltip title="Like">
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
                onClick: like,
            })}
            </Tooltip>
            <span className="comment-action">{likes}</span>
        </span>,

        <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
                onClick: dislike,
            })}
            </Tooltip>
        <span className="comment-action">{dislikes}</span>
        </span>,
        <span key="comment-basic-reply-to" onClick={() => {
            props.fetchReplyList(commentID);
            setModalVisible(true)

        }}>
            查看回复
        </span>,
        <span key="comment-basic-reply-to" onClick={() => {
            setCommentVisible(!commentVisible);
        }}>
            {commentVisible ? '取消回复' : '回复'}
        </span>,
    ];

    const onInlineCommentClick = () => {

        setIsSubmitting(true);
        props.postReply(
            commentID,
            props.uid,
            commentOwnerID,
            inlineCommentValue
        ).then(res => {
            setTimeout(() => {
                setInlineCommentValue('');
                setIsSubmitting(false);
                message.info('评论发表成功');
            }, 1000)
        })
    };

    const onInlineCommentChange = e => {
        console.log(e.target.value);
        setInlineCommentValue(e.target.value);
    };

    return (
        <>
            <CMM
                actions={actions}
                author={<a>{username}</a>}
                avatar={
                    avatar ?
                        <Avatar
                            src={avatar.src}
                            alt={avatar.alt}
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
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />

            {commentVisible ?
                (
                    <InlineComment
                        username={username}
                        onClick={onInlineCommentClick}
                        onChange={onInlineCommentChange}
                        value={inlineCommentValue}
                        isSubmitting={isSubmitting}
                    />
                ) : ''
            }


            <ReplyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                commentID={commentID}
            />
        </>

    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
