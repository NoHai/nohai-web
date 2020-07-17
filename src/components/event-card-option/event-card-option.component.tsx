import { Col, Row } from 'antd';
import React, { Component } from 'react';
import './event-card-option.component.scss';
import { EventCardOptionProps } from './event-card-option.props';

class EventCardOption extends Component<EventCardOptionProps> {
  state = {
    description: '',
  };

  componentDidMount() {
    this.setState({
      description: this.props.description,
    });
  }
  handleInputChange(event: any) {
    const { name, value } = event.target;
    if (this.props.onValueChange) {
      this.props.onValueChange(name, value);
    }
  }

  render() {
    const isReadOnly = this.props.isReadOnly !== undefined ? this.props.isReadOnly : true;
    return (
      <div className="event-card-option">
        <Row>
          <Col span={3} className="text-left">
            <div className={`icon ${this.props.iconClass}`}></div>
          </Col>

          <Col span={21}>
            <div className="event-card-option-title">{this.props.title}</div>
            {this.props.description != "" && (
              <input
                name={this.props.name}
                readOnly={isReadOnly}
                className="event-card-option-description"
                value={this.props.description}
                onChange={(e) => this.handleInputChange(e)}
              ></input>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCardOption;
