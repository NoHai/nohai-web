import React, { Component } from 'react';
import './create-event.page.scss';
import { Switch, Route } from 'react-router';
import PatricipantsDetailsPage from './participants/patricipants-details.page';
import PageNotFound from '../../common/not-found/not-found.page';
import LocationDetailsPage from './location/location-details.page';
import DescriptionPage from './description/description.page';
import EventDetailsPage from '../details/event-details.page';

class CreateEventPage extends Component {
  public render() {
    return (
      <div className="create-event-page">
        <Switch>
          <Route exact path="/create-event" component={PatricipantsDetailsPage} />
          <Route path="/create-event/participants-details" component={PatricipantsDetailsPage} />
          <Route path="/create-event/location-details" component={LocationDetailsPage} />
          <Route path="/create-event/description" component={DescriptionPage} />
          <Route path="/create-event/preview" component={EventDetailsPage} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default CreateEventPage;
