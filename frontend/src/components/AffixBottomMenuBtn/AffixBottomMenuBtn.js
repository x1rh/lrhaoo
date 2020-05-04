import React from "react";
import PropTypes from 'prop-types';

import {Affix} from "antd";
import {MenuOutlined} from "@ant-design/icons";


const AffixBottomMenuBtn = ({onClick}) => {

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
            <Affix offsetBottom={1} style={style} onClick={onClick} >
                <MenuOutlined/>
            </Affix>
        </div>
    );

};

AffixBottomMenuBtn.propTypes = {
    onClick: PropTypes.func
};

export default AffixBottomMenuBtn;