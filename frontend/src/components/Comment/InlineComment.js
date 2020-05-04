import React from "react";
import PropTypes from 'prop-types';
import {Button, Col, Input, Row} from "antd";


const InlineComment = ({username, value, onClick, onChange, isSubmitting}) => {

    return (
        <div>
            <Row>
                <Col span={20} offset={1}>
                    <Input size="large" placeholder={`回复 ${username}`} onChange={onChange} value={value}/>
                </Col>
                <Col span={2}>
                    <Button
                        size="large"
                        type="primary"
                        style={{marginLeft: 8}}
                        onClick={onClick}
                        disabled={!value}
                        loading={isSubmitting}
                    >
                        发布
                    </Button>
                </Col>
            </Row>
        </div>
    )
};


InlineComment.propTypes = {
    username: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    isSubmitting: PropTypes.bool
};

InlineComment.defaultProps = {
    username: '',
    value: '',
    isSubmitting: false
};


export default InlineComment;