import {Drawer, Menu} from "antd";
import React from "react";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import SiderNavbarFooter from "./SiderNavbarFooter";


const SiderNavbar = ({onClose, visible, username, isAuthenticated, logout}) => {

    const bodyStyle = {
        padding: 0
    };

    const title = isAuthenticated?`欢迎你, ${username}`:'导航栏';

    return (
        <Drawer
            title={title}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
            bodyStyle={bodyStyle}
            footer={
                <SiderNavbarFooter
                    onClose={onClose}
                    isAuthenticated={isAuthenticated}
                    logout={logout}
                />
            }
        >
            <Menu
                mode="inline"
            >

                <Menu.Item key="1">
                    <MailOutlined/>
                    <Link to="/" onClick={onClose}>首页</Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <MailOutlined/>
                    <Link to="/gallery" onClick={onClose}>相册</Link>
                </Menu.Item>

                <Menu.Item key="3">

                    <AppstoreOutlined/>
                    <Link to="/tags" onClick={onClose}>文章分类</Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <SettingOutlined/>
                    <Link to="/about" onClick={onClose}>关于我</Link>
                </Menu.Item>

            </Menu>
        </Drawer>
    );
};


SiderNavbar.propTypes = {
    onClose: PropTypes.func,
    visible: PropTypes.bool,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool
};


export default SiderNavbar;

