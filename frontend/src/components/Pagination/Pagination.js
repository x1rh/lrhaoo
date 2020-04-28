import React from "react";
import {Pagination} from "antd";

const ArticlePagination = (props) => {
    return(
        <Pagination
            simple
            defaultPageSize={props.defaultPageSize}
            total={props.total}
            style={{textAlign: "center"}}
            onChange={props.onChange}
        />
    );
};

export default ArticlePagination;