import React from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";

class CountDownButton extends React.Component {
    constructor(props) {
        super(props);

        this.flag = true;
        this.seconds = this.props.seconds;

        this.state = {
            content: ''
        };
        this.onClick = this.onClick.bind(this);
    }

    tick() {
        if (this.seconds > 0) {
            this.setState({
                content: (--this.seconds).toString() + ' s'
            });
        } else {
            this.setState({
                content: '重新发送'
            });
            this.seconds = this.props.seconds;
            clearInterval(this.interval);
        }
    }

    onClick() {
        this.flag = false;
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Button onClick={this.onClick} block>
                {this.flag ?
                    '获取验证码' :
                    this.state.content
                }
            </Button>
        );
    }
}

CountDownButton.propTypes = {
    seconds: PropTypes.number.isRequired
};

export default CountDownButton;