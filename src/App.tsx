import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SearchEventsPage from './pages/event/search-events/search-events.page';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={SearchEventsPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </div>
            </Router>
        );
    }
}

export default App;
