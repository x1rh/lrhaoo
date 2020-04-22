import React, {useEffect, useState} from "react";

import ReactMarkdown from "react-markdown";
import {useParams} from 'react-router-dom';
import CodeBlock from "./CodeBlock";
import ImageBlock from "./ImageBlock";
import remarkToc from "remark-toc";

import './Article.css';

require('github-markdown-css');

const Article = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const url = '/api/article/' + id;

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setContent(content + data['content']);
        });
    }, []);

    return (
        <div className='markdown-body'>
            <ReactMarkdown
                source={content}
                renderers={{code: CodeBlock, image:ImageBlock}}
                skipHtml={false}
                escapeHtml={false}
                plugins={[remarkToc]}
            />
        </div>

    );
};

export default Article;