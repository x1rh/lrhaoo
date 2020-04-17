import React from "react";
import {Layout, BackTop, Pagination} from 'antd';
import './App.css'
import AffixBottomMenuBtn from '../../components/AffixBottomMenuBtn/AffixBottomMenuBtn';
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import SiderNavbar from '../../components/SiderNavbar/SiderNavbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {authenticate} from '../../actions/auth';
import {fetchArticleList} from '../../actions/data';

const {Sider, Content} = Layout;



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        authenticate: (access_token, refresh_toekn) =>
            dispatch(authenticate(access_token, refresh_toekn)),
        fetchArticleList: () => dispatch(fetchArticleList())
    });
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showSiderNavbar = this.showSiderNavbar.bind(this);
        this.closeSiderNavbar = this.closeSiderNavbar.bind(this);
    }

    state = {siderNavbarVisible: false};

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.authenticate(
                localStorage.getItem('access_token'),
                localStorage.getItem('refresh_token')
            );
        }
        this.props.fetchArticleList();
    }

    showSiderNavbar = () => {
        this.setState({
            siderNavbarVisible: true,
        });
    };

    closeSiderNavbar = () => {
        this.setState({
            siderNavbarVisible: false,
        });
    };


    render() {
        return (
            <div>
                <SiderNavbar
                    onClose={this.closeSiderNavbar}
                    visible={this.state.siderNavbarVisible}
                />
                <Layout className='background'>
                    <Sider className='background'>  </Sider>
                    <Layout>
                        <Header className='background'/>
                        <Content style={{padding:24}} className='background'>
                            <div id={"content"}>
                                <ArticleListItem/>

                                <ArticleListItem/>

                                <ArticleListItem/>
                            </div>
                            <Pagination simple defaultCurrent={2} total={50} style={{textAlign:"center"}}/>
                        </Content>
                        <Footer />
                    </Layout>
                    <Sider className='background'/>
                </Layout>

                <AffixBottomMenuBtn
                    showSiderNavbar={this.showSiderNavbar}
                    style={{position: 'fixed', bottom: 100, right: 114 }}
                />
                <BackTop />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);