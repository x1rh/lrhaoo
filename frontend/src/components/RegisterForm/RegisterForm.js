import React from "react";
import './RegisterForm.css';
import {
    Form,
    Input,
    Row,
    Col, Button
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";

import CountDownButton from "../CountDownButton/CountDownButton";
import {bindActionCreators} from "redux";
import * as actionCreators from '../../actions/auth';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';


const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

const RegisterForm = (props) => {
    const history = useHistory();

    const onFinish = values => {
        const {username, email, password, verifyCode} = values;
        let formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('verifyCode', verifyCode);
        props.registerUser(formData, history);
    };

    return (
        <Form
            name="register-form"
            className="register-form"
            initialValues={{
                size: 'large',
                remember: true,
            }}
            size={'large'}
            onFinish={onFinish}
        >

            <Form.Item
                name="username"
                rules={[
                    {
                        min: 1,
                        message: 'at least one character'
                    },
                    {
                        max: 16,
                        message: 'The input is not valid username!',
                    },
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password Again"
                />
            </Form.Item>

            <Form.Item
                name="verifyCode"
                dependencies={['email']}
                rules={[
                    {
                        required: true,
                        message: '请输入验证码!',
                        whitespace: true,
                    },
                ]}
            >
                <Row gutter={8}>
                    <Col span={17}>
                        <Input placeholder="验证码"/>
                    </Col>
                    <Col span={7}>
                        <CountDownButton seconds={6}/>
                    </Col>
                </Row>

            </Form.Item>

            <Row>
                <Col span={12}>
                    <Button block type="primary" htmlType="submit">注册</Button>
                </Col>
                <Col span={12}>
                    <a href='/login' className='login-link'>使用已有账户登录</a>
                </Col>
            </Row>

        </Form>

    );

};

export default connect(null, mapDispatchToProps)(RegisterForm);