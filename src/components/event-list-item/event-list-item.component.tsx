import React, { Component } from 'react';
import './event-list-item.component.scss';
import ItemCard from '../item-card/item-card.component';

class EventListItem extends Component {
    render() {
        return (
            <div className="event-list-item" style={{ backgroundImage: this.GenerateGradient() }}>
                <ItemCard />
            </div>
        );
    }

    private GenerateGradient(): string {
        const intR = Math.floor(Math.random() * 255) + 1;
        const intG = Math.floor(Math.random() * 255) + 1;
        const intB = Math.floor(Math.random() * 255) + 1;
        return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
    }
}

export default EventListItem;
