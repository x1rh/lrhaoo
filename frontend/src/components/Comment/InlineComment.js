import {Button, Col, Input, Row} from "antd";
import React from "react";

const InlineComment = ({username, onChange, onClick}) => {
    return (
        <div>
            <Row>
                <Col span={20} offset={1}>
                    <Input size="large" placeholder={`回复 ${username}`} onChange={onChange}/>
                </Col>
                <Col span={2}>
                    <Button size="large" type="primary" style={{marginLeft: 8}} onClick={onClick}>发布</Button>
                </Col>
            </Row>
        </div>
    );
};

export default InlineComment;