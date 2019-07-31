import React, { Component } from 'react';
import './event-details.page.scss';
import EventCard from '../../../components/event-card/event-card.component';
import { EventDetailsViewModel } from '../../../contracts/models';

class EventDetailsPage extends Component {
    render() {
        return (
            <div className="event-list-item">
                <EventCard eventDetails={new EventDetailsViewModel()} />
            </div>
        );
    }
}

export default EventDetailsPage;
