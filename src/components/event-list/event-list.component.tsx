import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './event-list.component.scss';
import EventListItem from '../event-list-item/event-list-item.component';
import { EventDetailsViewModel } from '../../contracts/models';
import { EventService } from '../../business/services';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import AppLoading from '../app-loading/app-loading.component';
import NoResults from '../no-results/no-results.component';
import AppInfiniteScroll from '../app-infinite-scroll/app-infinite-scroll.component';
import LoadingHelper from '../../helpers/loading.helper';

class EventList extends Component {
  public eventRequest = new FindEventRequest();
  public eventDetilsContainer = new Array<EventDetailsViewModel>();

  state = {
    eventDetails: new Array<EventDetailsViewModel>(),
    hasMoreItems: true,
    pageIndex: 0,
    total: 0,
  };

  constructor(props: any) {
    super(props);
    this.eventRequest.title = '';
    this.getEvents = this.getEvents.bind(this);
  }

  async componentDidMount() {
    await this.getEvents();
  }

  render() {
    return (
      <AppInfiniteScroll hasMore={this.state.hasMoreItems} next={this.getEvents}>
        {this.displayEvents()}
      </AppInfiniteScroll>

      // <div id="scrollableDivTest" className="full-height" style={{ overflow: 'auto' }}>
      //   <InfiniteScroll
      //     dataLength={this.state.total}
      //     next={this.getEvents}
      //     hasMore={this.state.hasMoreItems}
      //     loader={<div>loading</div>}
      //     scrollableTarget="scrollableDivTest"
      //   >
      //     {this.displayEvents()}
      //   </InfiniteScroll>
      // </div>
    );
  }

  private displayEvents() {
    return this.state.eventDetails && this.state.eventDetails.length > 0 ? (
      <div className="event-list">
        {this.state.eventDetails &&
          this.state.eventDetails.map((event: EventDetailsViewModel) => (
            <EventListItem key={event.event.Id} eventDetails={event} />
          ))}
      </div>
    ) : (
      <NoResults text="Nu exista evenimente" />
    );
  }

  private async getEvents() {
    LoadingHelper.showLoading();
    this.eventRequest.pageIndex = this.state.pageIndex;
    const result = await EventService.Find(this.eventRequest);

    this.eventDetilsContainer.push(...result.Data);

    this.setState({
      hasMoreItems: this.eventDetilsContainer.length < result.Total,
      eventDetails: this.eventDetilsContainer,
      pageIndex: this.eventRequest.pageIndex + 1,
      total: result.Total,
    });

    LoadingHelper.hideLoading();
  }
}

export default EventList;
