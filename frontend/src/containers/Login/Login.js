import {Col, Layout, Row} from "antd";
import LoginAndRegisterHeader from "../../components/LoginAndRegisterHeader/LoginAndRegisterHeader";
import Footer from "../../components/Footer/Footer";
import LoginForm from "../../components/LoginForm/LoginForm";
import React from "react";

const Login = () => {

    return (
        <Layout>
            <Layout.Content>
                <Row>
                    <Col span={8} offset={8}>
                        <LoginAndRegisterHeader/>
                        <LoginForm/>
                    </Col>
                </Row>
            </Layout.Content>
            <Footer/>
        </Layout>
    );

};

export default Login;