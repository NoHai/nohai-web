import React, { Component } from 'react';
import './event-details.page.scss';
import EventCard from '../../../components/event-card/event-card.component';
import { match } from 'react-router-dom';
import { EventService } from '../../../business/services';
import { EventDetailsViewModel } from '../../../contracts/models';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';

interface DetailParams {
  id: string;
}

interface DetailsProps {
  required: string;
  match?: match<DetailParams>;
  eventDetails: any;
}

class EventDetailsPage extends Component<DetailsProps> {
  state = {
    eventDetails: new EventDetailsViewModel(),
  };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      const eventDetails = await EventService.Get(this.props.match.params.id);
      this.setState({
        eventDetails,
      });
    } else {
      this.setState({
        eventDetails: JSON.parse(localStorage.getItem(LocalStorage.CreateEvent) || '{}'),
      });
    }
  }
  render() {
    return (
      <div className="event-list-item">
        <EventCard eventDetails={this.state.eventDetails} />
      </div>
    );
  }
}

export default EventDetailsPage;
