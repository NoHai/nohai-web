import React, { Component } from 'react';
import { EventDetailsViewModel } from '../../contracts/models';
import EventCardOption from '../event-card-option/event-card-option.component';
import EventHelper from '../../helpers/event.helper';

class EventCardDetails extends Component<{ event: EventDetailsViewModel }> {
  render() {
    const event = this.props.event;
    const sportLevel = EventHelper.getLevel(event);
    const price = EventHelper.getPrice(event);
    const date = EventHelper.getDate(event);
    const time = EventHelper.getTime(event);
    const location = event.locationDetails;

    return (
      <div>
        <EventCardOption
          title={`${event.sport.Name}, ${sportLevel}`}
          iconClass="mdi mdi-whistle"
          description={price}
        />

        <EventCardOption title={date} iconClass="mdi mdi-clock-outline" description={time} />

        <EventCardOption
          title={location.StreetName}
          iconClass="mdi mdi-map-marker"
          description={`${location.City}, ${location.County}`}
        />
      </div>
    );
  }
}

export default EventCardDetails;
