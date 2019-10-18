import React, { Component } from 'react';
import './event-card-title.component.scss';
import { Row, Col } from 'antd';
import { EventSportImage } from '../event-icon/event-sport-image.component';
import { EventCardTitleProps } from './event-card-title.props';

class EventCardTitle extends Component<EventCardTitleProps> {
  render() {
    return (
      <div className="event-card-title">
        <Row type="flex" align="middle">
          <Col span={5} className="text-center">
            <EventSportImage url={this.props.imagePath} />
          </Col>
          <Col span={19}>
            <div className="item-card-title">{this.props.title}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCardTitle;
