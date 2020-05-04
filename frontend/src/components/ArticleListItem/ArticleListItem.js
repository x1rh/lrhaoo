import React from "react";
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

import {PageHeader, Tag, Typography, Row, Col, Divider, Button} from 'antd';

import './ArticleListItem.css';


const ArticleListItem = ({article}) => {

    const {title, timestamp, description, articleID, tags} = article;

    const history = useHistory();

    const {Paragraph} = Typography;

    const onClick = e => {
        const url = 'article/' + articleID;
        history.push(url);
    };

    return (
        <div>
            <PageHeader
                title={title}
                className="list-item"
                subTitle={timestamp}
                tags={
                    tags?tags.map((tag, idx) => {
                        return <Tag color="blue" key={idx}>{tag.tagName}</Tag>
                    }):[]
                }
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

ArticleListItem.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        articleID: PropTypes.string.isRequired
    }))
};

export default ArticleListItem;

