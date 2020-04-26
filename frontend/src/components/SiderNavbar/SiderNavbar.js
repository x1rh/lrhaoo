import {Drawer, Menu, Button} from "antd";
import React from "react";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from '../../actions/auth';

const mapStateToProps = state => {
    return ({
        username: state.auth.username
    });
};

const SiderNavbarFooter = (props) => {
    const history = useHistory();

    const onClickLogin = e => {
        history.push('/login');
        props.onClose();
    };

    const onClickRegister = e => {
        history.push('/register');
        props.onClose();
    };

    return (
        <>
            <Button type="primary" onClick={onClickLogin}>登陆</Button>
            <Button type="primary" style={{marginLeft: 20}} onClick={onClickRegister}>注册</Button>
        </>
    );
};

const SiderNavbar = (props) => {


    const handleClick = e => {
        console.log('click sider navbar', e);
    };


    const bodyStyle = {
        padding: 0
    };

    return (
        <Drawer
            title="阿秀的导航栏"
            placement="right"
            closable={true}
            onClose={props.onClose}
            visible={props.visible}
            bodyStyle={bodyStyle}
            footer={<SiderNavbarFooter onClose={props.onClose}/>}
        >
            <Menu
                onClick={handleClick}
                mode="inline"
            >

                <Menu.Item key="1">
                    <MailOutlined/>
                    <Link to="/">首页</Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <MailOutlined/>
                    <Link to="/gallery">相册</Link>
                </Menu.Item>

                <Menu.Item key="3">

                    <AppstoreOutlined/>
                    <Link to="/tags">文章分类</Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <SettingOutlined/>
                    <Link to="/about">关于我</Link>
                </Menu.Item>

            </Menu>


            {props.username ?
                <p>欢迎你，{props.username}</p> :
                <p>陌生人你好</p>
            }
        </Drawer>
    );
};


export default connect(mapStateToProps)(SiderNavbar);

