import React from "react";
import {Layout, BackTop, Affix, Typography, Drawer, Pagination, Menu, Row, Col} from 'antd';
import BlogItem from "./BlogItem";
import {MenuOutlined, LinkedinOutlined, ZhihuOutlined, MailOutlined, GithubOutlined} from "@ant-design/icons";
import './BlogSkeleton.css'
import MenuItem from "antd/es/menu/MenuItem";

const {Header, Footer, Sider, Content} = Layout;

const {Title} = Typography;

class AffixBottomMenuBtn extends React.Component{
    render() {
        return (
            <div>
                <Affix offsetBottom={10} style={this.props.style}>

                    <MenuOutlined onClick={this.props.showDrawer}/>
                </Affix>
            </div>
        );
    }
}

class BlogSkeleton extends React.Component {
    constructor(props) {
        super(props);
        this.showDrawer = this.showDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    state = {drawerVisible: false};

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    closeDrawer = () => {
        this.setState({
            drawerVisible: false,
        });
    };


    render() {
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={true}
                    onClose={this.closeDrawer}
                    visible={this.state.drawerVisible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <Layout>
                    <Sider theme={"light"}></Sider>
                    <Layout>
                        <Header style={{background: "white", minHeight:"245px"}}>
                            <Row>
                                <Col span={12}>
                                    <Title id="blog-title">阿秀</Title>
                                    <div className="blog-icon-container">
                                        <ZhihuOutlined className="blog-icon"/>
                                        <GithubOutlined className="blog-icon"/>
                                        <MailOutlined className="blog-icon"/>
                                        <LinkedinOutlined className="blog-icon"/>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <Menu mode="horizontal" className="blog-menu">
                                        <Menu.Item key="">HOME</Menu.Item>
                                        <Menu.Item key="">ARCHIVE</Menu.Item>
                                        <Menu.Item key="">ABOUT</Menu.Item>
                                    </Menu>
                                </Col>
                            </Row>

                        </Header>
                        <Content style={{padding:24}}>
                            <div id={"content"}>
                                <BlogItem/>
                                <BlogItem/>
                                <BlogItem/>
                            </div>
                            <Pagination simple defaultCurrent={2} total={50} style={{textAlign:"center"}}/>
                        </Content>
                        <Footer style={{background: "white", textAlign:"center"}}>Copyright© 2020   阿秀   Power by antd </Footer>
                    </Layout>
                    <Sider theme={"light"}></Sider>
                </Layout>

                <AffixBottomMenuBtn
                    showDrawer={this.showDrawer}
                    style={{position: 'fixed', bottom: 100, right: 114 }}
                />
                <BackTop />
            </div>
        );
    }
}

export default BlogSkeleton;