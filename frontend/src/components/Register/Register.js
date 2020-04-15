import React from "react";
import './Register.css'
import {
    Form,
    Input,
    Layout,
    Row,
    Col, Button
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";

import Footer from "../Footer/Footer";
import LoginAndRegisterHeader from "../LoginAndRegisterHeader/LoginAndRegisterHeader";
import CountDownButton from "../CountDownButton/CountDownButton";

class RegisterForm extends React.Component {

    onFinish = values => {
        console.log('Received values of form: ', values);
    };


    render() {
        return (
            <Form
                name="register-form"
                className="register-form"
                initialValues={{
                    size: 'large',
                    remember: true,
                }}
                size={'large'}
                onFinish={this.onFinish}
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
                    name="verify code"
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
                        <Button block type="primary">注册</Button>
                    </Col>
                    <Col span={12}>
                        <a href='/login' className='login-link'>使用已有账户登录</a>
                    </Col>
                </Row>

            </Form>

        );
    }


}


const Register = () => {
    return (
        <Layout>
            <Layout.Content>
                <Row>
                    <Col span={8} offset={8}>
                        <LoginAndRegisterHeader/>
                        <RegisterForm/>
                    </Col>
                </Row>
            </Layout.Content>
            <Footer/>
        </Layout>
    );

};

export default Register;