import React, { Component } from 'react';
import './search-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventDetailsViewModel, ListModel } from '../../../contracts/models';
import LoadingHelper from '../../../helpers/loading.helper';
import { EventService } from '../../../business/services';
import { CommonService } from '../../../business/services/common.service';
import { SportModel } from '../../../contracts/models/sport.model';
import EventFilter from '../../../components/event-filter/event-filter.component';
class SearchEventsPage extends Component {
  public eventRequest = new FindEventRequest();
  public eventDetilsContainer = new Array<EventDetailsViewModel>();
  public sports = new ListModel<SportModel>();

  state = {
    eventDetails: new Array<EventDetailsViewModel>(),
    hasMoreItems: true,
    pageIndex: 0,
    total: 0,
    showFilter: false,
  };

  constructor(props: any) {
    super(props);
    this.eventRequest.showHistory = false;
  }

  async componentDidMount() {
    await this.getEvents();
    this.sports = await CommonService.GetSports();
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

export default SearchEventsPage;
