import React, { Component } from 'react';
import './search-events.page.scss';
import EventList from '../../../components/event-list/event-list.component';

class SearchEventsPage extends Component {
    public render() {
        return (
            <div className="full-height">
                <EventList />
            </div>
        );
    }
}

export default SearchEventsPage;
