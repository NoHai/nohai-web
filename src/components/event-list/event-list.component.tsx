import React, { Component } from 'react';
import './event-list.component.scss';
import EventListItem from '../event-list-item/event-list-item.component';
import { EventDetailsViewModel } from '../../contracts/models';
import NoResults from '../no-results/no-results.component';
import AppInfiniteScroll from '../app-infinite-scroll/app-infinite-scroll.component';
import { EventListProps } from './event-list.component.props';

class EventList extends Component<EventListProps> {

  render() {
    return (
      <AppInfiniteScroll hasMore={this.props.hasMoreItems} next={()=> this.getEvents()}>
        {this.displayEvents()}
      </AppInfiniteScroll>
    );
  }

  private displayEvents() {
    return this.props.eventDetails && this.props.eventDetails.length > 0 ? (
      <div className="event-list">
        {this.props.eventDetails &&
          this.props.eventDetails.map((event: EventDetailsViewModel) => (
            <EventListItem key={event.event.Id} eventDetails={event} />
          ))}
      </div>
    ) : (
      <NoResults text="Nu exista evenimente" />
    );
  }

  private async getEvents() {
    if (this.props.onEventsDetailsChange) {
      this.props.onEventsDetailsChange();
    }   
  }
}

export default EventList;
