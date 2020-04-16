import React, {useState} from "react";
import {AutoComplete, Button, Checkbox, Form, Input} from "antd";
import {GithubOutlined, LockOutlined, QqOutlined, UserOutlined, WechatOutlined, WeiboOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actionCreator from "../../actions/auth";
import './LoginForm.css';

const mapStateToProps = state => {
    return {
        email: state.email,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreator, dispatch);
};

const LoginForm = (props) => {

    const history = useHistory();

    const onFinish = values => {
        // console.log('Received values of form: ', values);
        const email = values.email;
        const password = values.password;
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        props.loginUser(formData, history);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onEmailChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['@qq.com', '@gmail.com', '@163.com'].map(domain => `${value}${domain}`));
        }
    };

    const emailOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));

    return (
        <Form
            name="login-form"
            className="login-form"
            initialValues={{
                size: 'large',
                remember: true,
            }}
            size={'large'}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    }
                ]}
            >

                <AutoComplete options={emailOptions} onChange={onEmailChange}>
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
                </AutoComplete>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    {
                        min: 6,
                        message: 'at least 6 characters.'
                    },
                    {
                        max: 18,
                        message: 'at most 18 characters.'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />

            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>自动登录</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/foget_password">
                    忘记密码
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <div className="other-ways">
                    其他登录方式 &nbsp;&nbsp;
                    <GithubOutlined className='icon'/>
                    <WeiboOutlined className='icon'/>
                    <QqOutlined className='icon'/>
                    <WechatOutlined className='icon'/>
                    <a href="/register" className="login-form-forgot">注册账户</a>
                </div>

            </Form.Item>
        </Form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);