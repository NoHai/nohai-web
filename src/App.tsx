import React, { Component } from 'react';
import { Router, RouteProps, Redirect } from 'react-router';
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
import { checkUserDetails } from './redux/actions/auth.action';
import { initialAuthState } from './redux/reducers/auth.reducer';

class App extends Component<any, any> {
    async componentDidMount() {
        this.checkLogin();
        //this.checkUserDetails()
        const script = document.createElement('script');
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDx4lOromkMykLetHX78GQvWrMWrO7mmtM&libraries=places';
        script.async = true;
        await document.body.appendChild(script);
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
                            isCompleted={this.props.isCompleted}
                        />
                        <AuthorizationRoute
                            path="/register"
                            component={RegisterPage}
                            isAuthorized={this.props.isAuthorized}
                            isCompleted={this.props.isCompleted}
                        />
                        <AuthorizationRoute
                            path="/recover"
                            component={RecoveryPage}
                            isAuthorized={this.props.isAuthorized}
                            isCompleted={this.props.isCompleted}
                        />
                        <UnCompletedRoute
                            path="/intro"
                            component={IntroPage}
                            isAuthorized={this.props.isAuthorized}
                            isCompleted={this.props.isCompleted}
                        />
                        <PrivateRoute
                            component={WrapperPage}
                            isAuthorized={this.props.isAuthorized}
                            isCompleted={this.props.isCompleted}
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
    private checkUserDetails() {
        return this.props.checkUserDetails();
    }
}

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuthorized: boolean;
    isCompleted: false;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, isCompleted, ...rest } = props;

    return (
        <Route
            {...rest}
            render={routeProps =>
                isAuthorized ? (
                    isCompleted ? (
                        <Component {...routeProps} />
                    ) : (
                        <Redirect to={{ pathname: '/intro' }} />
                    )
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }
        />
    );
};

const AuthorizationRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, isCompleted, ...rest } = props;

    return (
        <Route
            {...rest}
            render={routeProps =>
                !isAuthorized ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }
        />
    );
};

const UnCompletedRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, isCompleted, ...rest } = props;

    return (
        <Route
            {...rest}
            render={routeProps =>
                !isCompleted ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={{ pathname: '/intro' }} />
                )
            }
        />
    );
};

const mapStateToProps = ({ authReducer }: any) => authReducer || initialAuthState;

const mapDispatchToProps = {
    checkLogin,
    // checkUserDetails,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
