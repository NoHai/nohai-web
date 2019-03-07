import React, { Component } from 'react';
import './event-list-item.component.scss';
import history from '../../utilities/history';
import EventItemCard from '../event-item-card/event-item-card.component';

class EventListItem extends Component {
    render() {
        return (
            <div
                className="event-list-item"
                style={{ backgroundImage: this.GenerateGradient() }}
                onClick={() => {
                    this.NavigateToEventDetails();
                }}
            >
                <EventItemCard />
            </div>
        );
    }

    private GenerateGradient(): string {
        const intR = Math.floor(Math.random() * 255) + 1;
        const intG = Math.floor(Math.random() * 255) + 1;
        const intB = Math.floor(Math.random() * 255) + 1;
        return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
    }

    private NavigateToEventDetails() {
        history.push('/details');
    }
}

export default EventListItem;
