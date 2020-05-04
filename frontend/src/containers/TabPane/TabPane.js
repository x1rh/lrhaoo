import React from "react";
import {connect} from "react-redux";

import {Tabs, Tag} from 'antd';

import ArticleList from "../../components/ArticleList/ArticleList";
import {fetchArticleList, fetchTagList} from '../../actions/data';


const mapStateToProps = state => {
    return ({
        tags: state.data.tags
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchArticleList: (tagID, page) => dispatch(fetchArticleList(tagID, page)),
        fetchTagList: () => dispatch(fetchTagList())
    });
};

class TabPane extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;

    }

    state = {
        panes: [],
        activeKey: 0
    };

    componentDidMount() {
        this.props.fetchTagList();
        const panes = [{
            tagName: '按时间排序',
            tagID: 0,
            key: '1',
        }];
        this.setState({
            panes: panes,
            activeKey: panes[0].key
        });
    }

    onChange = activeKey => {
        this.setState({activeKey});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = (tagName, tagID) => {
        const {panes} = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            tagName: `${tagName}`,
            tagID: tagID,
            key: activeKey,
        });
        this.setState({panes, activeKey});
    };

    remove = targetKey => {
        let {activeKey} = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({panes, activeKey});
    };

    render() {

        const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <p>点击标签获取不同分类文章</p>

                    {
                        this.props.tags ? this.props.tags.map(item => {
                            const idx = Math.floor((Math.random() * colors.length));
                            return (
                                <Tag
                                    color={colors[idx]}
                                    onClick={(e) =>
                                        this.add(item.tagName, item.tagID)
                                    }>
                                    {/*<a>{item.tagName}</a>*/}
                                    {item.tagName}
                                </Tag>)
                        }) : ''
                    }
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {
                        this.state.panes.map((pane, idx) => {
                                return (
                                    <Tabs.TabPane tab={pane.tagName} key={pane.key}>
                                        <ArticleList tagID={pane.tagID}/>
                                    </Tabs.TabPane>
                                );
                            }
                        )
                    }
                </Tabs>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabPane);