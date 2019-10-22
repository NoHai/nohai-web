import React, { Component } from 'react';
import './event-list-item.component.scss';
import history from '../../utilities/core/history';
import EventItemCard from '../event-item-card/event-item-card.component';
import { EventListItemProps } from './event-list-item.props';
import ColorHelper from '../../helpers/color.helper';

class EventListItem extends Component<EventListItemProps, any> {
  render() {
    return (
      <div
        className="event-list-item"
        style={{
          backgroundImage: ColorHelper.generateUniqueGradient(this.props.eventDetails.event.Id),
        }}
        onClick={() => {
          this.NavigateToEventDetails();
        }}
      >
        <EventItemCard eventDetails={this.props.eventDetails} />
      </div>
    );
  }

  private NavigateToEventDetails() {
    history.push('/details/' + this.props.eventDetails.event.Id);
  }
}

export default EventListItem;
