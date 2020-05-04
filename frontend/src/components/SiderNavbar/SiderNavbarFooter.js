import {useHistory} from "react-router-dom";
import {Button, Row, Col} from "antd";
import PropTypes from "prop-types";
import React from "react";

const SiderNavbarFooter = ({onClose, isAuthenticated}) => {
    const history = useHistory();

    const onClickLogin = e => {
        history.push('/login');
        onClose();
    };

    const onClickRegister = e => {
        history.push('/register');
        onClose();
    };

    return (
        <>
            {
                isAuthenticated ?
                    <Button type="primary" block>退出登录</Button>
                    :
                    <Row>
                        <Col span={8} offset={4}>
                            <Button type="primary" onClick={onClickLogin}>登陆</Button>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" onClick={onClickRegister}>注册</Button>
                        </Col>
                    </Row>
            }
        </>
    );
};

SiderNavbarFooter.propTypes = {
    onClose: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default SiderNavbarFooter;