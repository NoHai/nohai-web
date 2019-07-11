import React, { Component } from 'react';
import { Router, Redirect, RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/core/history';
import 'antd/dist/antd.css';
import './App.scss';

import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import RecoveryPage from './pages/auth/recovery/recovery.page';
import WrapperPage from './pages/common/wrapper/wrapper.page';
import IntroPage from './pages/intro/intro.page';
import AuthService from './business/services/auth.service';

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuthorized: boolean;
}

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isLoaded: false, isAuthorized: false };
    }

    async componentDidMount() {
        const isAuthorized = true // await AuthService.isAuthorized();

        this.setState({
            isAuthorized,
            isLoaded: true,
        });
    }

    render() {
        return this.state.isLoaded ? (
            <Router history={history}>
                <div className="app">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/recover" component={RecoveryPage} />
                        <PrivateRoute
                            path="/intro"
                            component={IntroPage}
                            isAuthorized={this.state.isAuthorized}
                        />
                        <PrivateRoute
                            component={WrapperPage}
                            isAuthorized={this.state.isAuthorized}
                        />
                    </Switch>
                </div>
            </Router>
        ) : (
            <div>loading</div>
        );
    }
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, isAuthorized, ...rest } = props;

    return (
        <Route
            {...rest}
            render={routeProps =>
                isAuthorized ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }
        />
    );
};

export default App;
