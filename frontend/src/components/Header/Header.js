import {Col, Layout, Menu, Row, Typography} from "antd";
import {GithubOutlined, LinkedinOutlined, MailOutlined, ZhihuOutlined} from "@ant-design/icons";
import React from "react";
import './Header.css'

const {Title} = Typography;

const Header = () => {
    return (
        <Layout.Header className='header'>
            <Row>
                <Col span={10} offset={1}>
                    <Title id="blog-title">阿秀</Title>
                    <div className="blog-icon-container">
                        <ZhihuOutlined className="blog-icon"/>
                        <GithubOutlined className="blog-icon"/>
                        <MailOutlined className="blog-icon"/>
                        <LinkedinOutlined className="blog-icon"/>
                    </div>
                </Col>
                <Col span={12}>
                    <Menu mode="horizontal" className="header-menu header">
                        <Menu.Item key="1">HOME</Menu.Item>
                        <Menu.Item key="2">ARCHIVE</Menu.Item>
                        <Menu.Item key="3">ABOUT</Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default Header;