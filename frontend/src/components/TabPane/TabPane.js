import { Tabs, Button, Tag } from 'antd';
import React from "react";
import ArticleList from "../ArticleList/ArticleList";
import {fetchArticleList} from '../../actions/data';
import {connect} from "react-redux";
import ArticlePagination from "../Pagination/Pagination";


const mapStateToProps = state => {
    return({
        articles: state.data.articles
    });
};

const mapDispatchToProps = dispatch => {
    return({
        fetchArticleList: (page) => dispatch(fetchArticleList(page))
    });
};

class TabPane extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      // { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  componentDidMount() {
      this.props.fetchArticleList(1);
  }

    onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
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
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
            <p>点击对应标签获取内容</p>
          <Button onClick={this.add}>ADD</Button>
            <Tag color="#55acee">
                Twitter
            </Tag>
            <Tag color="#55acee" onClick={this.add}>
                Twitter
            </Tag>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <Tabs.TabPane tab={pane.title} key={pane.key}>
              <ArticleList/>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabPane);