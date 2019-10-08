import React, { Component } from 'react';
import './history-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';
import LoadingHelper from '../../../helpers/loading.helper';
import { EventService } from '../../../business/services';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventDetailsViewModel } from '../../../contracts/models';

class HistoryEventsPage extends Component {
  public eventRequest = new FindEventRequest();
  public eventDetilsContainer = new Array<EventDetailsViewModel>();

  state = {
    eventDetails: new Array<EventDetailsViewModel>(),
    hasMoreItems: true,
    pageIndex: 0,
    total: 0,
  };

  constructor(props:any) {
    super(props);
    this.eventRequest.showHistory=true;
  }

  async componentDidMount() {
    await this.getEvents();
  }


  public render() {
    return (
      <div className="full-height">
        <EventList eventDetails={this.state.eventDetails} hasMoreItems={this.state.hasMoreItems} onEventsDetailsChange={() =>this.getEvents()}  />
      </div>
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

export default HistoryEventsPage;
