import React from "react";
import TabPane from "../../components/TabPane/TabPane";
import {Layout} from "antd";
import Header from "../../components/Header/Header";
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticlePagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";

const TagPage = (props) => {
    return (
        <Layout className='background'>
            <Layout.Sider className='background'> </Layout.Sider>
            <Layout>
                <Layout.Content style={{padding: 24}} className='background'>
                    <TabPane/>
                </Layout.Content>
                <Footer/>
            </Layout>
            <Layout.Sider className='background'/>
        </Layout>
    );
};

export default TagPage;