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
                    //src="https://maps.google.com/maps?q='+45.795252+','+24.149961+'&hl=es;z=14&amp;output=embed"
                    src="http://maps.google.com/maps?q=44.427881, 26.1473436&z=15&output=embed" 
                    scrolling="no"
                    style={{ border: 0 }}
                />
            </div>
        );
    }
}

export default EventMap;
