import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './wrapper.page.scss';
import SearchEventsPage from '../../event/search-events/search-events.page';
import PageNotFound from '../not-found/not-found.page';
import PageHeader from '../../../components/page-header/page-header.component';
import PageFooter from '../../../components/page-footer/page-footer.component';
import EventDetailsPage from '../../event/details/event-details.page';
import NotificationPage from '../../notification/notification.page';
import CreateEventPage from '../../event/create-event/create-event.page';
import UserProfilePage from '../../user/user-profile';
import IntroLocation from '../../intro/intro-notification/intro-notification.page';

class WrapperPage extends Component {
  public render() {
    return (
      <div className="page-wrapper page-sections">
        <PageHeader />

        <div className="page-wrapper-content page-section page-section-large">
          <Switch>
            <Route exact path="/" component={SearchEventsPage} />
            <Route exact={true} path="/details" component={EventDetailsPage} />
            <Route path="/details/:id" component={EventDetailsPage} />
            <Route path="/preview" component={EventDetailsPage} />
            <Route path="/notification" component={NotificationPage} />
            <Route path="/create-event" component={CreateEventPage} />
            <Route path="/profile" component={UserProfilePage} />
            <Route path="/step-four" component={IntroLocation} />
            <Route component={PageNotFound} />
          </Switch>
        </div>

        <PageFooter />
      </div>
    );
  }
}

export default WrapperPage;
