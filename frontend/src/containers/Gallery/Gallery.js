import React from "react";
import {Col, Row, Card} from 'antd';

const images = [
    {
        author: 'lrh',
        caption: 'caption text',
        url: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        url: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        url: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
];


const Gallery = (props) => {
    const {Meta} = Card;


    const gridStyle = {
        width: '50%',
        textAlign: 'center',
    };

    const onClick = e => {
        console.log('yes');
    };

    return (
        <Row>
            <Col span={20} offset={2}>

                <Card bordered={true}   >

                    {
                        images ? images.map(image => {
                            return (
                                <Card.Grid style={gridStyle} onClick={onClick}>
                                    <Card
                                        size={"small"}
                                        hoverable={true}
                                        cover={<img alt="it's a picture" src={image.url}/>}
                                    >
                                    </Card>
                                    <Meta title="Europe Street beat" description="www.instagram.com"/>
                                </Card.Grid>
                            )
                        }) : ''
                    }


                </Card>,
            </Col>
        </Row>
    );
};

export default Gallery;