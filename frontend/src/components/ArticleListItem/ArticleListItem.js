import React from "react";
import {PageHeader, Tag, Typography, Row, Col, Divider, Button} from 'antd';
import './ArticleListItem.css';
import {useHistory} from 'react-router-dom';

const {Paragraph} = Typography;

const ArticleListItem = (props) => {
        const {title, timestamp, description, article_id} = props.article;

        console.log('whati is article id: ' + article_id);
        const history = useHistory();

        const onClick = e => {
            const url = 'article/'+ article_id;
            console.log('what is url: ' + url);
            history.push(url);
        };

        return (
            <div>
                <PageHeader
                    title={title}
                    className="list-item"
                    subTitle={timestamp}
                    tags={[
                        <Tag color="blue" key={1}>python</Tag>,
                        <Tag color="blue" key={2}>闭包</Tag>,
                        <Tag color="blue" key={3}>装饰器</Tag>
                    ]}
                >


                    <Row>
                        <Col span={16}>
                            <div className='item-wrapper'>
                                <Paragraph>{description}</Paragraph>

                                <div>
                                    <Button type={"primary"} ghost onClick={onClick}>read more</Button>
                                </div>
                            </div>

                        </Col>
                        <Col span={8}>
                            <img
                                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                                alt="content"
                                width="100%"
                            />
                        </Col>
                    </Row>
                </PageHeader>
                <Divider/>
            </div>

        );
};

export default ArticleListItem;


