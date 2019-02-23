import React, { Component } from 'react';
import { withRouter, Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/history';
import 'antd/dist/antd.css';
import './App.scss';

import SearchEventsPage from './pages/event/search-events/search-events.page';
import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import PageNotFound from './pages/common/not-found.page';
import RecoveryPage from './pages/auth/recovery/recovery.page';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={SearchEventsPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/recover" component={RecoveryPage} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
