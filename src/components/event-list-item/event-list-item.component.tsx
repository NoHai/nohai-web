import React, { Component } from 'react';
import './event-list-item.component.scss';
import history from '../../utilities/core/history';
import EventItemCard from '../event-item-card/event-item-card.component';
import { EventListItemProps } from './event-list-item.props';

class EventListItem extends Component<EventListItemProps, any> {
    render() {
        return (
            <div
                className="event-list-item"
                style={{ backgroundImage: this.GenerateGradient() }}
                onClick={() => {
                    this.NavigateToEventDetails();
                }}
            >
                <EventItemCard eventDetails={this.props.eventDetails}/>
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
        history.push('/details/'+this.props.eventDetails.event.Id);
    }
}

export default EventListItem;
