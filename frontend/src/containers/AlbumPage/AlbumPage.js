import Album from "../../components/Album/Album";
import React, {Component} from "react";
import {Col, notification, Row} from "antd";
import PropTypes from 'prop-types';


class AlbumPage extends Component {

    componentDidMount() {
        notification.open({
            message: '第三方图源',
            description: '加载过慢，请等待，功能等待完善',
            duration: 7
        });
    }

    render() {
        return (
            <Row>
                <Col offset={4} span={16}>
                    <div style={{paddingTop: 75}}>
                        <Album images={this.props.images} hideMenuButton={this.props.hideMenuButton}/>
                    </div>
                </Col>
            </Row>
        );
    }
}

AlbumPage.propTypes = {
    hideMenuButton: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    }))
};

AlbumPage.defaultProps = {
    images: [
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/785293/pexels-photo-785293.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/785293/pexels-photo-785293.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/785293/pexels-photo-785293.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
    ]
};


export default AlbumPage;
