import React, { Component } from 'react';
import './event-tags.component.scss';
import { EventTagsProps } from './event-tags.component.props';
import { SportLevelType } from '../../contracts/enums/common/sport-level.type';

class EventTags extends Component<EventTagsProps> {
  render() {
    return (
      <div className="event-tags">
        <div className="event-tag">{this.props.Sport}</div>
        <div className="event-tag red">{SportLevelType[this.props.Level]}</div>
        {this.props.Price > 0 && (
          <div className="event-tag outline">Cost: {this.props.Price} lei / persoana</div>
        )}
        {(this.props.Price === 0 || !this.props.Price) && (
          <div className="event-tag outline">Gratis</div>
        )}
      </div>
    );
  }
}

export default EventTags;
