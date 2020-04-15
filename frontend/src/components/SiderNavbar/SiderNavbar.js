import {Drawer, Menu, Button} from "antd";
import React from "react";
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from '../../actions/auth';

const mapStateToProps = state => {
    return({
        username: state.auth.username
    });
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

const SiderNavbar = (props) => {

    let history = useHistory();

     const handleClick = e => {
        console.log('click sider navbar', e);
      };

     const onClickLogin = e => {
         history.push('/login');
     };

     const onClickRegister = e => {
         history.push('/register')
     };

    return(
        <Drawer
            title="阿秀的导航栏"
            placement="right"
            closable={true}
            onClose={props.onClose}
            visible={props.visible}
        >
            <Menu
                onClick={handleClick}
                mode="inline"
            >

                <Menu.Item key="1">
                    <MailOutlined/>
                    Navigation One
                </Menu.Item>

                <Menu.Item key="2">
                    <SettingOutlined/>
                    Navigation two
                </Menu.Item>

                <Menu.Item key="3">
                    <AppstoreOutlined/>
                    Navigation two
                </Menu.Item>

            </Menu>
            <Button block onClick={onClickLogin}>登陆</Button>
            <Button block onClick={onClickRegister}>注册</Button>
            {props.username?
                <p>欢迎你，{props.username}</p>:
                <p>滚蛋，anonymous</p>
            }
        </Drawer>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(SiderNavbar);

