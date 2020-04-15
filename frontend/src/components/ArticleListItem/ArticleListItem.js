import React from "react";
import {PageHeader, Tag, Typography, Row, Col, Divider, Button} from 'antd';
import './ArticleListItem.css';

const {Paragraph} = Typography;

const content = (
    <>
        <Paragraph>
            Ant Design interprets the color system into two levels: a system-level color system and a
            product-level color system.
        </Paragraph>
        <Paragraph>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
            easier for designers to have a clear psychological expectation of color when adjusting colors,
            as well as facilitate communication in teams.
        </Paragraph>
        <div>
            <Button type={"primary"} ghost> read more</Button>
        </div>
    </>
);

const Content = ({children, extraContent}) => {
    return (
        <Row>
            <Col span={16}>{children}</Col>
            <Col span={8}>{extraContent}</Col>
        </Row>
    );
};




const ArticleListItem = () => {
        return (
            <div>
                <PageHeader
                    title="python装饰器"
                    className="list-item"
                    subTitle="2020/4/11"
                    tags={[
                        <Tag color="blue" key={1}>python</Tag>,
                        <Tag color="blue" key={2}>闭包</Tag>,
                        <Tag color="blue" key={3}>装饰器</Tag>
                    ]}
                >
                    <Content
                        extraContent={
                            <img
                                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                                alt="content"
                                width="100%"
                            />
                        }
                        children={content}
                    >
                    </Content>
                </PageHeader>
                <Divider/>
            </div>

        );
};

export default ArticleListItem;


