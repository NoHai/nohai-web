import React, { Component } from 'react';
import './event-sport-image.component.scss';

export class EventSportImage extends Component<{ url?: string }> {
  render(): any {
    return (
      <div className="event-icon-image">
        <div className="image" style={{ backgroundImage: `url(${this.props.url})` }}></div>
      </div>
    );
  }
}
