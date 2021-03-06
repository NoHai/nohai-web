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
import HistoryEventsPage from '../../event/history-event/history-events.page';
import HistoryHelper from '../../../utilities/core/history';
import EventInfoPage from '../../event/event-info/event-info.page';
import EditUserProfilePage from '../../edit-user-profile/edit-user-profile';

class WrapperPage extends Component {
  public render() {
    const isCreateEventPage = HistoryHelper.containsPath('/create-event') || HistoryHelper.containsPath('/edit-event');
    const isEditProfilePage = HistoryHelper.containsPath('/edit-profile');
    return (
      <div className="page-wrapper page-sections">
        <PageHeader />

        <div className="page-wrapper-content page-section page-section-large">
          <Switch>
            <Route exact path="/" component={SearchEventsPage} />
            <Route exact={true} path="/details" component={EventDetailsPage} />
            <Route path="/details/:id" component={EventDetailsPage} />
            <Route path="/notification" component={NotificationPage} />
            <Route path="/create-event" component={CreateEventPage} />
            <Route path="/edit-event" component={CreateEventPage} />
            <Route path="/profile" component={UserProfilePage} />
            <Route path="/edit-profile" component={EditUserProfilePage} />
            <Route path="/step-four" component={IntroLocation} />
            <Route path="/events-history" component={HistoryEventsPage} />
            <Route path="/event-info" component={EventInfoPage} />
            <Route path="/event-edit-info" component={EventInfoPage} />
            <Route component={PageNotFound} />
          </Switch>
        </div>

        {!isCreateEventPage && !isEditProfilePage && <PageFooter />}
      </div>
    );
  }
}

export default WrapperPage;
