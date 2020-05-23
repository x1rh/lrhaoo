import React from "react";
import {Col, Row, Card, notification} from 'antd';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class Gallery extends React.Component {

    componentDidMount() {
        notification.open({
            message: '第三方图源',
            description: '加载过慢，请等待，功能等待完善',
            duration: 7
        });
    }

    onClick = e => {
        this.props.history.push('/album');
    };

    render() {
        const {Meta} = Card;

        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };


        return (
            <Row>
                <Col span={20} offset={2}>

                    <Card bordered={true}>

                        {
                            this.props.images ? this.props.images.map((image, idx) => {
                                return (
                                    <Card.Grid style={gridStyle} onClick={this.onClick}>
                                        <Card
                                            size={"small"}
                                            hoverable={true}
                                            cover={<img alt="it's a picture" src={image.source}/>}
                                        >
                                        </Card>
                                        <Meta title={`相册${idx + 1}`} description="这是对相册的描述" style={{paddingTop: 10}}/>
                                    </Card.Grid>
                                )
                            }) : ''
                        }
                    </Card>,
                </Col>
            </Row>
        )
    }
}

Gallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
    })).isRequired
};

Gallery.defaultProps = {
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
            source: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            author: 'lrh',
            caption: 'caption text',
            source: 'https://images.pexels.com/photos/258510/pexels-photo-258510.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
    ]
};


export default withRouter(Gallery);