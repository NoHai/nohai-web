import React, { Component } from 'react';
import './event-item-card.component.scss';
import { Row, Col } from 'antd';
import { EventItemCardProps } from './event-item-card.props';
import DateHelper from '../../helpers/date.helper';
import { EventSportImage } from '../event-icon/event-sport-image.component';

class EventItemCard extends Component<EventItemCardProps, any> {
  render() {
    return (
      <div className="item-card">
        <Row>
          <Col span={5} className="text-center">
            <EventSportImage url={this.props.eventDetails.sport.ImagePath} />
          </Col>
          <Col span={19}>
            <div className="item-card-title">{this.props.eventDetails.event.Name}</div>

            <p>{this.props.eventDetails.description.Description}</p>
          </Col>
        </Row>

        <Row className="item-card-icons">
          <Col span={8}>
            <span className="icon mdi mdi-map-marker" />
            <span className="text">{this.props.eventDetails.locationDetails.City}</span>
          </Col>
          <Col span={10} className="text-center">
            <span className="icon mdi mdi-alarm" />
            <span className="text">
              {DateHelper.GetDateFormat(this.props.eventDetails.description.StartDate)}{' '}
              {this.props.eventDetails.description.StartTime}
            </span>
          </Col>
          <Col span={6} className="text-right">
            <span className="icon mdi mdi-account-group" />
            <span className="text">
              {this.props.eventDetails.participantsDetails.TotalParticipants}
              /{this.props.eventDetails.participantsDetails.FreeSpots}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventItemCard;
