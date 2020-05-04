import React from "react";
import PropTypes from 'prop-types';
import {Layout} from "antd";
import './BasicLayout.css'

const HomeLayout = ({children}) => {

    return (
        <Layout className='background'>
            <Layout.Sider className='background'> </Layout.Sider>
            <Layout>

                <Layout.Header className='background'>

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
