import React from "react";
import {Layout} from "antd";
import Header from "../../components/Header/Header";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticlePagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";

const {Sider, Content} = Layout;

const Home = () => {
    return (
        <Layout className='background'>
            <Sider className='background'> </Sider>
            <Layout>
                <Header className='background'/>
                <Content style={{padding: 24}} className='background'>
                    <div id={"content"}>
                        <ArticleList/>
                    </div>

                    <ArticlePagination/>
                </Content>
                <Footer/>
            </Layout>
            <Sider className='background'/>
        </Layout>
    );
};

export default Home;