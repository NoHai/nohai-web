import React, { Component } from 'react';
import './search-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventDetailsViewModel } from '../../../contracts/models';
import LoadingHelper from '../../../helpers/loading.helper';
import { EventService } from '../../../business/services';
import { Input } from 'antd';

class SearchEventsPage extends Component {
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
    this.eventRequest.showHistory = false;
  }

  async componentDidMount() {
    await this.getEvents();
  }

  public render() {
    return (
      <div className="full-height">
        <div className="page-sections">
          <div className="page-section">
            <div className="icon mdi mdi-magnify">
              <Input onChange={(e)=>this.onSearchChange(e)} placeholder="Cauta evenimente..."></Input>
            </div>
            <div className="icon mdi mdi-filter-menu"></div>
          </div>
          <div className="page-section-large">
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

  private async onSearchChange(data:any){
    const { value } = data.target
    console.log(value);
    this.eventRequest.searchText=value
    await this.getEvents()
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

export default SearchEventsPage;
