import React from "react";
import PropTypes from 'prop-types';
import {Col, Layout, Menu, Row, Typography} from "antd";
import './HomeLayout.css'
import {GithubOutlined, LinkedinOutlined, MailOutlined, ZhihuOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Title} = Typography;

const HomeLayout = ({children}) => {

    return (
        <Layout className='background'>
            <Layout.Sider className='background'> </Layout.Sider>
            <Layout>

                <Layout.Header className='header'>
                    <Row>
                        <Col span={8} offset={1}>
                            <Title id="blog-title">阿秀</Title>
                            <div className="blog-icon-container">
                                <a href="https://www.zhihu.com/people/shan-shang-xia-yu" className="link-icon">
                                    <ZhihuOutlined/>
                                </a>

                                <a href="https://github.com/lrhhhhhh" className="link-icon">
                                    <GithubOutlined/>
                                </a>

                                <a className="link-icon">
                                    <MailOutlined/>
                                </a>

                                <a className="link-icon">
                                    <LinkedinOutlined/>
                                </a>

                            </div>
                        </Col>
                        <Col span={10} offset={5}>
                            <Menu mode="horizontal" className="header-menu header">
                                <Menu.Item key="1"><Link to="/tags">TAG</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/gallery">PHOTOS</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/about">ABOUT</Link></Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Layout.Header>

                <Layout.Content style={{padding: 24}} className='background'>
                    {children}
                </Layout.Content>
                <Layout.Footer className="footer">
                    Copyright© 2020 阿秀 Power by antd
                </Layout.Footer>
            </Layout>
            <Layout.Sider className='background'/>
        </Layout>
    );
};

HomeLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)]
    )
};

export default HomeLayout;
