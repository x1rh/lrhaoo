import React from "react";
import './App.css'
import AffixBottomMenuBtn from '../../components/AffixBottomMenuBtn/AffixBottomMenuBtn';
import SiderNavbar from '../../components/SiderNavbar/SiderNavbar';
import {connect} from "react-redux";
import {authenticate, loginUser, registerUser} from '../../actions/auth';

import {Route, Switch, Redirect} from "react-router-dom";
import Article from "../Article/Article";
import About from "../About/About";
import Gallery from "../Gallery/Gallery";
import AlbumPage from "../AlbumPage/AlbumPage";

import {withRouter} from 'react-router-dom';

import {BackTop} from "antd";
import TabPane from "../TabPane/TabPane";
import BasicLayout from "../../components/Layout/BasicLayout";
import HomeLayout from "../../components/Layout/HomeLayout";
import ArticleList from "../../components/ArticleList/ArticleList";
import AuthLayout from "../../components/Layout/AuthLayout";
import LoginAndRegisterHeader from "../../components/LoginAndRegisterHeader/LoginAndRegisterHeader";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import PropTypes from 'prop-types';
import {fetchArticleList} from "../../actions/data";



const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,

        articles: state.data.articles,
        page: state.data.page,
        perPage: state.data.perPage,
        total: state.data.total
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        authenticate: (accessToken, refreshToken, history) =>
            dispatch(authenticate(accessToken, refreshToken, history)),
        loginUser: (email, password, history) =>
            dispatch(loginUser(email, password, history)),
        registerUser: (username, email, password, verifyCode, history) =>
            dispatch(registerUser(username, email, password, verifyCode, history)),
        fetchArticleList: (categoryID, page) =>
            dispatch(fetchArticleList(categoryID, page)),
    });
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showSiderNavbar = this.showSiderNavbar.bind(this);
        this.closeSiderNavbar = this.closeSiderNavbar.bind(this);
        this.hideMenuButton = this.hideMenuButton.bind(this);
    }

    state = {
        siderNavbarVisible: false,
        menuButtonVisible: true
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.authenticate(
                localStorage.getItem('accessToken'),
                localStorage.getItem('refreshToken'),
                this.props.history
            );
        }
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

    hideMenuButton = () => {
        this.setState({
            menuButtonVisible: !this.state.menuButtonVisible
        })
    };

    render() {
        return (
            <div>
                <SiderNavbar
                    onClose={this.closeSiderNavbar}
                    visible={this.state.siderNavbarVisible}
                    username={this.props.username}
                    isAuthenticated={this.props.isAuthenticated}
                />

                <Switch>
                    <Route path="/home" exact>
                        <HomeLayout>
                            <ArticleList tagID={0} />
                        </HomeLayout>
                    </Route>
                    <Route path="/article/:id" component={Article}/>
                    <Route path="/login">
                        <AuthLayout>
                            <LoginAndRegisterHeader/>
                            <LoginForm loginUser={this.props.loginUser}/>
                        </AuthLayout>
                    </Route>

                    <Route path="/register">
                        <AuthLayout>
                            <LoginAndRegisterHeader/>
                            <RegisterForm registerUser={this.props.registerUser}/>
                        </AuthLayout>
                    </Route>
                    <Route path="/about" component={About}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/album">
                        <AlbumPage hideMenuButton={this.hideMenuButton}/>
                    </Route>
                    <Route path="/tags">
                        <BasicLayout>
                            <TabPane />
                        </BasicLayout>
                    </Route>
                    <Redirect to="/home"/>
                </Switch>
                {
                    this.state.menuButtonVisible ?
                        <AffixBottomMenuBtn onClick={this.showSiderNavbar}/>
                        : ''
                }
                <BackTop/>
            </div>
        );
    }
}

App.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));