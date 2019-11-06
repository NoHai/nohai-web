import React, { Component } from 'react';
import './event-item-card.component.scss';
import { Row, Col } from 'antd';
import { EventItemCardProps } from './event-item-card.props';
import DateHelper from '../../helpers/date.helper';
import { EventSportImage } from '../event-icon/event-sport-image.component';
import moment from 'moment';

class EventItemCard extends Component<EventItemCardProps, any> {
  render() {
    const city = this.props.eventDetails.locationDetails.City;
    const date = moment(this.props.eventDetails.description.StartDate).format("YYYY-MM-DD");
    const time = this.props.eventDetails.description.StartTime;
    const description = `${city}, ${DateHelper.GetDateFormat(date, 'dddd, DD MMMM')}, ${time}`;

    return (
      <div className="item-card">
        <Row type="flex" align="middle">
          <Col span={5} className="text-center">
            <EventSportImage url={this.props.eventDetails.sport.ImagePath} />
          </Col>
          <Col span={19}>
            <div className="item-card-title">{this.props.eventDetails.sport.Name}</div>
            <p className="item-card-list-description">{description}</p>
            <p className="item-card-list-description">{`Gazduit de ${this.props.eventDetails.owner.FirstName}`}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventItemCard;
