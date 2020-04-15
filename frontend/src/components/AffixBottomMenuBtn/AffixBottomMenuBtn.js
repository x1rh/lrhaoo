import React from "react";
import {Affix} from "antd";
import {MenuOutlined} from "@ant-design/icons";

export default class AffixBottomMenuBtn extends React.Component{
    render() {
        return (
            <div>
                <Affix offsetBottom={10} style={this.props.style}>
                    <MenuOutlined onClick={this.props.showSiderNavbar}/>
                </Affix>
            </div>
        );
    }
}

// export default AffixBottomMenuBtn;