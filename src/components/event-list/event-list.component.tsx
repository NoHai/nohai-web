import React, { Component } from 'react';
import './event-list.component.scss';
import EventListItem from '../event-list-item/event-list-item.component';

class EventList extends Component {
    render() {
        return (
            <div className="event-list">
                <EventListItem />
                <EventListItem />
                <EventListItem />
                <EventListItem />
            </div>
        );
    }
}

export default EventList;
