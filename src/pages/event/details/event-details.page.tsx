import React, { Component } from 'react';
import './event-details.page.scss';
import EventCard from '../../../components/event-card/event-card.component';

class EventDetailsPage extends Component {
    render() {
        return (
            <div className="event-list-item full-height">
                <EventCard />
            </div>
        );
    }
}

export default EventDetailsPage;
