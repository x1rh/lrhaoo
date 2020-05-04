import {Col, Layout, Row} from "antd";
import React from "react";
import PropTypes from 'prop-types';


const AuthLayout = ({children}) => {
    return (
        <Layout>
            <Layout.Content>
                <Row>
                    <Col span={8} offset={8}>
                        {children}
                    </Col>
                </Row>
            </Layout.Content>
            <Layout.Footer className="footer">
                Copyright© 2020 阿秀 Power by antd
            </Layout.Footer>
        </Layout>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)]
    )
};

export default AuthLayout;