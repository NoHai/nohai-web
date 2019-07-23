import React, { Component } from 'react';
import { Router, Redirect, RouteProps } from 'react-router';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/core/history';
import 'antd/dist/antd.css';
import './App.scss';

import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import RecoveryPage from './pages/auth/recovery/recovery.page';
import WrapperPage from './pages/common/wrapper/wrapper.page';
import IntroPage from './pages/intro/intro.page';
import { checkLogin } from './redux/actions/auth.action';
import { initialAuthState } from './redux/reducers/auth.reducer';

class App extends Component<any, any> {
    componentDidMount() {
        this.checkLogin();
    }

    render() {
        return this.props.isLoaded ? (
            <Router history={history}>
                <div className="app">
                    <Switch>
                        <AuthorizationRoute
                            path="/login"
                            component={LoginPage}
                            isAuthorized={this.props.isAuthorized}
                        />
                        <AuthorizationRoute
                            path="/register"
                            component={RegisterPage}
                            isAuthorized={this.props.isAuthorized}
                        />
                        <AuthorizationRoute
                            path="/recover"
                            component={RecoveryPage}
                            isAuthorized={this.props.isAuthorized}
                        />
                        <PrivateRoute
                            path="/intro"
                            component={IntroPage}
                            isAuthorized={this.props.isAuthorized}
                        />
                        <PrivateRoute
                            component={WrapperPage}
                            isAuthorized={this.props.isAuthorized}
                        />
                    </Switch>
                </div>
            </Router>
        ) : (
            <div>loading</div>
        );
    }

    private checkLogin() {
        return this.props.checkLogin();
    }
}

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuthorized: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, ...rest } = props;

    return (
        <Route
            {...rest}
            render={
                routeProps => <Component {...routeProps} />
                // isAuthorized ? (
                //     <Component {...routeProps} />
                // ) : (
                //     <Redirect to={{ pathname: '/login' }} />
                // )
            }
        />
    );
};

const AuthorizationRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, ...rest } = props;

    return (
        <Route
            {...rest}
            render={
                routeProps => <Component {...routeProps} />
                // !isAuthorized ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/' }} />
            }
        />
    );
};

const mapStateToProps = ({ authReducer }: any) => authReducer || initialAuthState;

const mapDispatchToProps = {
    checkLogin,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
