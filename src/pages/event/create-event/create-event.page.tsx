import React, { Component } from 'react';
import './create-event.page.scss';
import { Switch, Route } from 'react-router';
import patricipantsDetailsPage from './participants/patricipants-details.page';
import PageNotFound from '../../common/not-found/not-found.page';
import locationDetailsPage from './location/location-details.page';
import descriptionPage from './description/description.page';

class CreateEventPage extends Component {
  public render() {
    return (
      <div className="create-event-page">
        <Switch>
          <Route exact path="/create-event" component={patricipantsDetailsPage} />
          <Route path="/create-event/participants-details" component={patricipantsDetailsPage} />
          <Route path="/create-event/location-details" component={locationDetailsPage} />
          <Route path="/create-event/description" component={descriptionPage} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default CreateEventPage;
