import React, { Component } from 'react';
import { EventMapProps } from './event-map.props';

class EventMap extends Component<EventMapProps> {
  render() {
    return (
      <div className="event-map">
        <iframe
          width="100%"
          height="250"
          title="Google Map"
          src={this.GetMapLink()}
          scrolling="no"
          style={{ border: 0 }}
        />
      </div>
    );
  }

  private GetMapLink() {
    return `https://maps.google.com/maps?q=${this.props.latitude}, ${this.props.longitude}&z=15&output=embed`;
  }
}

export default EventMap;
