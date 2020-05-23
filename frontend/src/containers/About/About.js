import React from "react";
import {Row, Col} from 'antd';
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import remarkToc from "remark-toc";
import ReactMarkdown from "react-markdown";

require('github-markdown-css');

const content = "## 有关于我\n" +
    "刘某浩，丁丑年生，男，广埠屯女子师范专科学校-传说(CS)专业毕业\n" +
    "\n" +
    "## 爱好\n" +
    "唱歌，跑步，编码，吃好吃的\n" +
    "\n" +
    "## 技能树\n" +
    "- python进阶中\n" +
    "- flask爱好者\n" +
    "- 前端开源UI组件库爱好者\n" +
    "- `ls`, `ps`, `kill`, `grep`擅长者\n" +
    "- `docker exec`, `docker ps`, `docker-compose up`爱好者\n" +
    "- 入算法坑摔死的蒟蒻，算法及数据结构模板套用者\n" +
    "- `c with STL`, `c with class` 爱好者\n" +
    "\n" +
    "\n" +
    "## 长者的教诲\n" +
    "> 一个人的命运, 当然要靠自我奋斗, 但也要考虑到历史的进程\n" +
    "\n";

const About = () => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <div className='markdown-body'>
                    <ReactMarkdown
                        source={content}
                        renderers={{code: CodeBlock}}
                        skipHtml={false}
                        escapeHtml={false}
                        plugins={[remarkToc]}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default About;