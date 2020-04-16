import {Col, Layout, Row} from "antd";
import LoginAndRegisterHeader from "../../components/LoginAndRegisterHeader/LoginAndRegisterHeader";
import Footer from "../../components/Footer/Footer";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import React from "react";

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