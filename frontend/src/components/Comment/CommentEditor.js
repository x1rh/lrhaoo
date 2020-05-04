import React from "react";
import PropTypes from 'prop-types';
import {Form, Button, Input} from "antd";


const CommentEditor = ({onChange, onSubmit, submitting, value, disabled}) => {

    const {TextArea} = Input;

    return (
        <div>
            <Form.Item>
                <TextArea
                    rows={4}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    disabled={disabled}
                >
                    评论
                </Button>
            </Form.Item>
        </div>
    )
};

CommentEditor.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool
};

CommentEditor.defaultProps = {
    submitting: false,
    value: '',
    disabled: 'false'
};

export default CommentEditor;