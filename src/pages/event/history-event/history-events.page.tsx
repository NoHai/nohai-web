import React, { Component } from 'react';
import './history-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';
import LoadingHelper from '../../../helpers/loading.helper';
import { EventService } from '../../../business/services';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventDetailsViewModel } from '../../../contracts/models';
import EventFilter from '../../../components/event-filter/event-filter.component';

class HistoryEventsPage extends Component {
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
    this.eventRequest.showHistory = true;
  }

  async componentDidMount() {
    await this.getEvents();
  }

  public render() {
    return (
      <div className="full-height">
        <div className="page-sections">
          <div className="page-section">
            <EventFilter onOk={eventRequest => this.applyFilter(eventRequest)}></EventFilter>
          </div>
          <div className="page-section page-section-large">
            <EventList
              eventDetails={this.state.eventDetails}
              hasMoreItems={this.state.hasMoreItems}
              onEventsDetailsChange={() => this.getEvents()}
            />
          </div>
        </div>
      </div>
    );
  }
  private applyFilter(eventRequest: any) {
    this.eventDetilsContainer = new Array<EventDetailsViewModel>();
    this.eventRequest = eventRequest;
    this.eventRequest.showHistory = true;
    this.getEvents(true);
  }
  private async getEvents(search: boolean = false) {
    LoadingHelper.showLoading();
    this.eventRequest.pageIndex = search ? 0 : this.state.pageIndex;
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
