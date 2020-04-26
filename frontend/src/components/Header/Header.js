import {Col, Layout, Menu, Row, Typography} from "antd";
import {GithubOutlined, LinkedinOutlined, MailOutlined, ZhihuOutlined} from "@ant-design/icons";
import React from "react";
import './Header.css'
import {Link} from "react-router-dom";

const {Title} = Typography;

const Header = () => {
    return (
        <Layout.Header className='header'>
            <Row>
                <Col span={8} offset={1}>
                    <Title id="blog-title">阿秀</Title>
                    <div className="blog-icon-container">
                        <a href="https://www.zhihu.com/people/shan-shang-xia-yu" className="link-icon">
                            <ZhihuOutlined />
                        </a>

                        <a href="https://github.com/lrhhhhhh" className="link-icon">
                            <GithubOutlined />
                        </a>

                        <a className="link-icon">
                            <MailOutlined />
                        </a>

                        <a className="link-icon">
                            <LinkedinOutlined />
                        </a>

                    </div>
                </Col>
                <Col span={14}>
                    <Menu mode="horizontal" className="header-menu header">
                        <Menu.Item key="1"><Link to="/tags">TAGS</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/archive">ARCHIVE</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/gallery">PHOTOS</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/about">ABOUT</Link></Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default Header;