import React from "react";
import {Form, Button, Input} from "antd";

const {TextArea} = Input;

const CommentEditor = ({onChange, onSubmit, submitting, value, disabled}) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} disabled={disabled}/>
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
);

export default CommentEditor;