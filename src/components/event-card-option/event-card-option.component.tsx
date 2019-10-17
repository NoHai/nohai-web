import React, { Component } from 'react';
import './event-card-option.component.scss';
import { EventCardOptionProps } from './event-card-option.props';
import { Row, Col } from 'antd';

class EventCardOption extends Component<EventCardOptionProps> {
  render() {
    return (
      <div className="event-card-option">
        <Row>
          <Col span={3} className="text-left">
            <div className={`icon ${this.props.iconClass}`}></div>
          </Col>

          <Col span={21}>
            <div className="event-card-option-title">{this.props.title}</div>
            <div className="event-card-option-description">{this.props.description}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCardOption;
