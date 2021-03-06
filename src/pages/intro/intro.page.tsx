import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './intro.page.scss';
import PageNotFound from '../common/not-found/not-found.page';
import IntroInfoPage from './intro-info/intro-info.page';
import IntroPersonPage from './intro-person/intro-person.page';
import IntroSport from './intro-sport/intro-sport.page';

class IntroPage extends Component {
  render() {
    return (
      <div className="intro-page">
        <Switch>
          <Route exact path="/intro" component={IntroInfoPage} />
          <Route path="/intro/step-one" component={IntroPersonPage} />
          <Route path="/intro/step-two" component={IntroSport} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default IntroPage;
