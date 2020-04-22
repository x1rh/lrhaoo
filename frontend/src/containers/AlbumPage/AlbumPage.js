import Album from "../../components/Album/Album";
import React, {Component} from "react";
import {Col, Row} from "antd";

const images = [
    {
        author: 'lrh',
        caption: 'caption text luping the third',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
    {
        author: 'lrh',
        caption: 'caption text',
        source: 'http://h1.ioliu.cn/bing/VernalFalls_ZH-CN2664125316_1920x1080.jpg?imageslim'
    },
];


class AlbumPage extends Component{
    render() {
        return(
            <Row>
                <Col offset={4} span={16}>
                    <Album images={images}/>
                </Col>
            </Row>
        );
    }
}

export default AlbumPage;