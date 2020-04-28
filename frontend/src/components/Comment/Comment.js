import React, {createElement, useState} from 'react';
import {Comment as CMM, Tooltip, Avatar, Modal} from 'antd';
import moment from 'moment';
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';
import ReplyModal from "./ReplyModal";

const Comment = (props) => {
    const {avatar, content} = props.data;

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        <span key="comment-basic-reply-to" onClick={() => setModalVisible(true)}>Reply to</span>,
    ];

    const onClick = () => {

    };

    return (
        <>
            <CMM
                actions={actions}
                author={<a>Han Solo</a>}
                avatar={
                    <Avatar
                        src={avatar.src}
                        alt={avatar.alt}
                    />
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

            <ReplyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>

    );
};

export default Comment;
