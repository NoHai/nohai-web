import React, { Component } from 'react';
import { EventDetailsViewModel } from '../../contracts/models';
import EventCardOption from '../event-card-option/event-card-option.component';

class EventCardDetails extends Component<{ event: EventDetailsViewModel }> {
  render() {
    return (
      <div>
        <EventCardOption
          title="Alergare montana, intermediar"
          iconClass="mdi mdi-whistle"
          description="20 lei / persoana"
        />

        <EventCardOption
          title="Joi, 22 noiembrie"
          iconClass="mdi mdi-clock-outline"
          description="17:30 - 19:15"
        />

        <EventCardOption
          title="General Eremia Grigorescu"
          iconClass="mdi mdi-map-marker"
          description="Sibiu, Romania"
        />

        <hr />
      </div>
    );
  }
}

export default EventCardDetails;
