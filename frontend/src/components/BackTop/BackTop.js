import React from "react";
import {BackTop as BT} from "antd";

const BackTop = (props) => {
    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 40,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };

    return (
        <div>
            <BT>
                {/*<div style={style}>up</div>*/}
            </BT>
        </div>
    );
};

export default BackTop;