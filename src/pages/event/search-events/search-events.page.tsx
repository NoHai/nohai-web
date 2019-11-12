import React, { Component } from 'react';
import './search-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventDetailsViewModel, ListModel } from '../../../contracts/models';
import LoadingHelper from '../../../helpers/loading.helper';
import { EventService } from '../../../business/services';
import { Row, Col, Modal, Select, DatePicker } from 'antd';
import { CommonService } from '../../../business/services/common.service';
import { SportModel } from '../../../contracts/models/sport.model';
import moment from 'moment';
const { Option } = Select;
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
            <Row className="inline-input-wrapper">
              <Col span={12}>
                <input
                  className="input"
                  onChange={e => this.onSearchChange(e)}
                  placeholder="Cauta evenimente..."
                ></input>
                <span className="icon mdi mdi-magnify"></span>
              </Col>
              <Col span={12} className="text-right">
                <div
                  className="icon mdi mdi-filter-menu"
                  onClick={() => this.toggleShowModal()}
                ></div>
              </Col>
            </Row>
          </div>
          <div className="page-section page-section-large">
            <EventList
              eventDetails={this.state.eventDetails}
              hasMoreItems={this.state.hasMoreItems}
              onEventsDetailsChange={() => this.getEvents()}
            />
            <Modal
              title="Filtreaza evenimentele"
              visible={this.state.showFilter}
              onOk={() => this.applyFilter()}
              onCancel={() => this.toggleShowModal()}
            >
              <label>Dupa sport:</label>
              <div>
                <Select
                  className="select"
                  size="default"
                  placeholder="Selecteaza Sportul"
                  onChange={(value: string) => {
                    if (this.eventRequest.sports) this.eventRequest.sports.push(value);
                  }}
                >
                  {this.sports.Data.map((element: any, index: any) => (
                    <Option key={index} value={element.Id}>
                      {element.Name}
                    </Option>
                  ))}
                </Select>
              </div>
              <label>Dupa data de inceput:</label>
              <DatePicker
                className="select"
                onChange={(date, dateString) => {
                  this.eventRequest.startDate = dateString;
                }}
                placeholder={'Alege Data'}
                size="default"
              />
            </Modal>
          </div>
        </div>
      </div>
    );
  }

  private toggleShowModal() {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }
  private async onSearchChange(data: any) {
    this.eventDetilsContainer = new Array<EventDetailsViewModel>();
    const { value } = data.target;
    this.eventRequest.searchText = value;
    this.getEvents(true);
  }

  private applyFilter() {
    this.eventDetilsContainer = new Array<EventDetailsViewModel>();
    this.getEvents(true);
    this.toggleShowModal();
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
