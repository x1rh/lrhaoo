import React from "react";
import {PageHeader, Menu, Dropdown, Button, Tag, Typography, Row, Col, Divider} from 'antd';
import './BlogItem.css';

const {Paragraph} = Typography;


const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    },
];

const IconLink = ({src, text}) => (
    <a className="item-link">
        <img className="item-link-icon" src={src} alt={text}/>
        {text}
    </a>
);

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
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                text="Quick Start"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                text=" Product Info"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                text="Product Doc"
            />
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




class BlogItem extends React.Component {
    render() {
        return (
            <div>
                <PageHeader
                    title="python装饰器"
                    className="site-page-header"
                    subTitle="This is a subtitle"
                    tags={[<Tag color="blue">python</Tag>, <Tag color="blue">闭包</Tag>, <Tag color="blue">装饰器</Tag>]}
                    avatar={{src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'}}
                    breadcrumb={{routes}}
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
    }
}

export default BlogItem;


