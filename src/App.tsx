import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';

import SearchEventsPage from './pages/event/search-events/search-events.page';
import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import PageNotFound from './pages/common/not-found.page';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/" component={SearchEventsPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
