import {List, message, Avatar, Spin, Modal} from 'antd';
import React from "react";
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';
import './ReplyModal.css';
import {authenticate} from "../../actions/auth";
import {fetchReplyList} from "../../actions/data";
import {connect} from 'react-redux';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


const mapStateToProps = state => {
    return {

        uid: state.auth.uid,
        replies: state.data.replies,

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
        fetchReplyList: (commentID) => dispatch(fetchReplyList(commentID))
    }
};


class ReplyModal extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    // componentDidMount() {
    //     // this.fetchData(res => {
    //     //     this.setState({
    //     //         data: res.results,
    //     //     });
    //     // });
    //     this.props.fetchReplyList(this.props.commentID);
    // }

    fetchData = callback => {
        axios({
            url: fakeDataUrl,
            responseType: 'json',
            method: 'get',
            contentType: 'application/json',
        }).then(response => {
            callback(response.data);
        })
    };

    handleInfiniteOnLoad = () => {
        let {data} = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    render() {
        return (

            <Modal
                title="查看对话"
                style={{top: 20, padding: 0,}}
                width={725}
                visible={this.props.modalVisible}

                onOk={() => this.props.setModalVisible(false)}
                onCancel={() => this.props.setModalVisible(false)}
            >


                <div className="reply-modal">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.props.replies?this.props.replies:[]}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                        }
                                        title={<a href="https://ant.design">{item.fromUser.username}</a>}
                                        description={item.fromUser.email}
                                    />
                                    <div>{item.content}</div>
                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="reply-modal-loading-container">
                                    <Spin/>
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);