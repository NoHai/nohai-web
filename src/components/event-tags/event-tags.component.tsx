import React, { Component } from 'react';
import './event-tags.component.scss';

class EventTags extends Component {
    render() {
        return (
            <div className="event-tags">
                <div className="event-tag">Alergat</div>
                <div className="event-tag red">Avansat</div>
                <div className="event-tag outline">Cost: 10 lei / persoana</div>
            </div>
        );
    }
}

export default EventTags;
