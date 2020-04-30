import React from "react";
import {Pagination as Pagi} from "antd";

const Pagination = (props) => {
    return(
        <Pagi
            simple
            defaultPageSize={props.defaultPageSize}
            total={props.total}
            pageSize={props.pageSize}
            style={{textAlign: "center"}}
            onChange={props.onChange}
        />
    );
};

export default Pagination;