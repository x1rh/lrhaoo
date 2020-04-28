import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {useParams} from 'react-router-dom';
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import remarkToc from "remark-toc";
import Comment from "../../components/Comment/Comment";
import {List} from "antd";

import './Article.css';

require('github-markdown-css');

const commentData = [
     {
        avatar: {
            src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            alt: "Han Solo"
        },
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    },
     {
        avatar: {
            src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            alt: "Han Solo"
        },
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    },
     {
        avatar: {
            src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            alt: "Han Solo"
        },
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    },
    {
        avatar: {
            src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            alt: "Han Solo"
        },
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    },
];

const Article = () => {
    const {id} = useParams();
    const [content, setContent] = useState('');
    const url = '/api/article/' + id;

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setContent(content + data['content']);
        });
    }, []);

    return (
        <div>
            <div className='markdown-body'>
                <ReactMarkdown
                    source={content}
                    renderers={{code: CodeBlock}}
                    skipHtml={false}
                    escapeHtml={false}
                    plugins={[remarkToc]}
                />
            </div>
            <div className="comment-area">

                <List
                    className="comment-list"
                    header={`n replies`}
                    itemLayout="horizontal"
                    dataSource={commentData}
                    renderItem={item => (
                        <li>
                            <Comment data={item}/>
                        </li>
                    )}
                />
            </div>
            <div className="comment-pagination">

            </div>
        </div>

    );
};

export default Article;