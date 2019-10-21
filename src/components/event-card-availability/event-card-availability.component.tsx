import React, { Component } from 'react';
import './event-card-availability.component.scss';
import EventHelper from '../../helpers/event.helper';
import { EventDetailsViewModel } from '../../contracts/models';
import EventCardOption from '../event-card-option/event-card-option.component';

export class EventCardAvailability extends Component<{
  event: EventDetailsViewModel;
  userId: string;
}> {
  render() {
    return (
      <EventCardOption
        title={this.getFreeSpots()}
        iconClass="mdi mdi-account-multiple"
        description={this.getTotal()}
      />
    );
  }

  private getFreeSpots() {
    const spots = EventHelper.getAvailableSpots(this.props.event);
    if (spots === null) {
      return 'Hai si tu, sunt locuri nelimitate';
    } else if (spots === 0) {
      return 'S-au ocupat toate locurile';
    }

    const result = spots > 1 ? `Mai sunt ${spots} locuri disponibile` : 'Mai este un singur loc';
    return result;
  }

  private getTotal() {
    const total = this.props.event.participantsDetails.FreeSpots;
    return total && total > 0 ? `Total locuri: ${total}` : '';
  }
}
