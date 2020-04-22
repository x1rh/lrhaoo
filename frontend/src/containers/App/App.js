import React from "react";
import {Layout, BackTop, Pagination} from 'antd';
import './App.css'
import AffixBottomMenuBtn from '../../components/AffixBottomMenuBtn/AffixBottomMenuBtn';
import ArticleListItem from '../../components/ArticleListItem/ArticleListItem';
import SiderNavbar from '../../components/SiderNavbar/SiderNavbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {connect} from "react-redux";
import {authenticate} from '../../actions/auth';
import {fetchArticleList} from '../../actions/data';
import ArticleList from "../../components/ArticleList/ArticleList";
import ArticlePagination from "../../components/Pagination/Pagination";

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Article from "../../components/Article/Article";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "../About/About";
import ImageBlock from "../../components/Article/ImageBlock";
import Gallery from "../Gallery/Gallery";
import AlbumPage from "../AlbumPage/AlbumPage";
import Home from "../Home/Home";

const {Sider, Content} = Layout;


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        page: state.data.page,
        perPage: state.data.perPage,
        articleTotal: state.data.articleTotal,
        loaded: state.data.loaded,
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        authenticate: (access_token, refresh_toekn) =>
            dispatch(authenticate(access_token, refresh_toekn)),
        fetchArticleList: (page) => dispatch(fetchArticleList(page))
    });
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showSiderNavbar = this.showSiderNavbar.bind(this);
        this.closeSiderNavbar = this.closeSiderNavbar.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    state = {
        siderNavbarVisible: false,
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.authenticate(
                localStorage.getItem('access_token'),
                localStorage.getItem('refresh_token')
            );
        }
        this.props.fetchArticleList(1);
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

    onPaginationChange = (page, pageSize) => {
        this.props.fetchArticleList(page);
    };


    render() {
        return (
            <div>
                <SiderNavbar
                    onClose={this.closeSiderNavbar}
                    visible={this.state.siderNavbarVisible}
                />

                 <Switch>

                    <Route path="/home" exact component={Home}/>
                    <Route path="/article/:id" component={Article}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/about" component={About}/>
                    <Route path="/image" component={ImageBlock}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/album" component={AlbumPage}/>
                </Switch>


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