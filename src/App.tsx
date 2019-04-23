import React, { Component } from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/history';
import 'antd/dist/antd.css';
import './App.scss';

import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import RecoveryPage from './pages/auth/recovery/recovery.page';
import WrapperPage from './pages/common/wrapper/wrapper.page';
import IntroPage from './pages/intro/intro.page';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="app">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/recover" component={RecoveryPage} />
                        <Route path="/intro" component={IntroPage} />
                        <Route component={WrapperPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
