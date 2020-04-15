import React, {useEffect, useState} from "react";

import ReactMarkdown from "react-markdown";
import {useParams} from 'react-router-dom';


const Article = () => {
    const { id } = useParams();
    const [content, setContent] = useState("## this is a title \n hello");
    const url = '/api/article/' + id;

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setContent(content + data['content']);
        });
    }, []);

    return (
        <ReactMarkdown source={content}/>
    );
};

export default Article;