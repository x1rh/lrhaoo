import React from "react";
import {Layout} from "antd";
import './Home.css';
import Header from "../../components/Header/Header";
import ArticleList from "../../components/ArticleList/ArticleList";
import Footer from "../../components/Footer/Footer";

const {Sider, Content} = Layout;


const Home = () => {
    return (
        <Layout className='background'>
            <Sider className='background'> </Sider>
            <Layout>
                <Header className='background'/>
                <Content style={{padding: 24}} className='background'>
                    <ArticleList/>
                </Content>
                <Footer/>
            </Layout>
            <Sider className='background'/>
        </Layout>
    );
};

export default Home;