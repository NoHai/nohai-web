import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './intro.page.scss';
import IntroNamePage from './intro-name/intro-name.page';
import PageNotFound from '../common/not-found/not-found.page';
import IntroInfoPage from './intro-info/intro-info.page';

class IntroPage extends Component {
    render() {
        return (
            <div className="intro-page">
                <Switch>
                    <Route exact path="/intro" component={IntroInfoPage} />
                    <Route path="/intro/step-one" component={IntroNamePage} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}

export default IntroPage;
