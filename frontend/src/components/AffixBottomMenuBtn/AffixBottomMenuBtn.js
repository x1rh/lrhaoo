import React from "react";
import {Affix} from "antd";
import {MenuOutlined} from "@ant-design/icons";

export default class AffixBottomMenuBtn extends React.Component {


    render() {


        const style = {
            position: 'fixed',
            bottom: 50,
            right: 50,


            height: 40,
            width: 40,
            lineHeight: '40px',
            borderRadius: 40,
            backgroundColor: 'gray',
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        };

        return (
            <div>
                <Affix offsetBottom={1} style={style} onClick={this.props.showSiderNavbar}>
                    <MenuOutlined/>
                </Affix>
            </div>
        );
    }
}

// export default AffixBottomMenuBtn;