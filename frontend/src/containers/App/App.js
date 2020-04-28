import React from "react";
import './App.css'
import AffixBottomMenuBtn from '../../components/AffixBottomMenuBtn/AffixBottomMenuBtn';
import SiderNavbar from '../../components/SiderNavbar/SiderNavbar';
import {connect} from "react-redux";
import {authenticate} from '../../actions/auth';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Article from "../Article/Article";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "../About/About";
// import ImageBlock from "../../components/Article/ImageBlock";
import Gallery from "../Gallery/Gallery";
import AlbumPage from "../AlbumPage/AlbumPage";
import Home from "../Home/Home";
import {withRouter} from 'react-router-dom';
import TabPage from "../TagPage/TagPage";
import Archive from "../Archive/Archive";
import BackTop from "../../components/BackTop/BackTop";


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        authenticate: (accessToken, refreshToken, history) =>
            dispatch(authenticate(accessToken, refreshToken, history)),
    });
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.showSiderNavbar = this.showSiderNavbar.bind(this);
        this.closeSiderNavbar = this.closeSiderNavbar.bind(this);
    }

    state = {
        siderNavbarVisible: false,
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
                    {/*<Route path="/image" component={ImageBlock}/>*/}
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/album" component={AlbumPage}/>
                    <Route path="/tags" component={TabPage}/>
                    <Route path="/archive" component={Archive}/>
                    <Redirect to="/home"/>
                </Switch>


                <AffixBottomMenuBtn
                    showSiderNavbar={this.showSiderNavbar}
                />
                <BackTop />



            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));