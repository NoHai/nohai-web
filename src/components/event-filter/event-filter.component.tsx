import React, { Component } from 'react';
import { Modal, DatePicker, Select } from 'antd';
import { SportModel } from '../../contracts/models/sport.model';
import { ListModel } from '../../contracts/models';
import './event-filter.component.scss';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import { EventFilterProps } from './event-filter.component.props';
import { CommonService } from '../../business/services/common.service';
const { Option } = Select;

class EventFilter extends Component<EventFilterProps> {
  public eventRequest = new FindEventRequest();
  public sports = new ListModel<SportModel>();

  state = {
    showFilter: false,
  };

  async componentDidMount() {
    this.sports = await CommonService.GetSports();
  }
  render() {
    return (
      <div className="event-filter">
        <div className="event-filter-wrapper">
          <div className="search-field">
            <span className="icon mdi mdi-magnify"></span>
            <input onChange={e => this.onSearchChange(e)} placeholder="Cauta evenimente..."></input>
          </div>

          <div
            className="icon mdi mdi-filter margin-top filter-button"
            onClick={() => this.toggleShowModal()}
          ></div>
        </div>

        <Modal
          title="Filtreaza evenimentele"
          visible={this.state.showFilter}
          onOk={() => this.applyyFilter()}
          onCancel={() => this.toggleShowModal()}
        >
          <label className="inline-input-label">Dupa sport</label>
          <span className="optional-span">(Optional)</span>
          <div className="filter-modal-select">
            <Select
              className="input-filter-size"
              size="default"
              placeholder="Selecteaza Sportul"
              onChange={(value: string) => {
                this.sportChange(value);
              }}
            >
              <Option key={27895} value={''}>
                {'Nici un sport selectat'}
              </Option>
              {this.sports.Data.map((element: any, index: any) => (
                <Option key={index} value={element.Id}>
                  {element.Name}
                </Option>
              ))}
            </Select>
          </div>
          <label className="inline-input-label">Dupa data de inceput</label>
          <span className="optional-span">(Optional)</span>
          <DatePicker
            className="input-filter-size"
            onChange={(date, dateString) => {
              this.dateChange(dateString);
            }}
            placeholder={'Alege Data'}
            size="default"
          />
        </Modal>
      </div>
    );
  }
  private async onSearchChange(data: any) {
    const { value } = data.target;
    this.eventRequest.searchText = value;
    this.props.onOk(this.eventRequest);
  }

  private applyyFilter() {
    this.props.onOk(this.eventRequest);
    this.toggleShowModal();
  }

  private sportChange(value: string) {
    this.eventRequest.sports = [];
    if (value !== '') {
      this.eventRequest.sports.push(value);
    }
  }

  private dateChange(date: string) {
    this.eventRequest.sports = [];
    if (date !== '') {
      this.eventRequest.startDate = date;
    }
  }

  private toggleShowModal() {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }
}

export default EventFilter;
