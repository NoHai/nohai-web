import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './event-list.component.scss';
import EventListItem from '../event-list-item/event-list-item.component';
import { EventDetailsViewModel } from '../../contracts/models';
import { EventService } from '../../business/services';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import AppLoading from '../app-loading/app-loading.component';

class EventList extends Component {
    public eventRequest = new FindEventRequest();
    public eventDetilsContainer = new Array<EventDetailsViewModel>();

    state = {
        eventDetails: new Array<EventDetailsViewModel>(),
        hasMoreItems: true,
        pageIndex:0
    };

    constructor(props: any) {
        super(props);
        this.eventRequest.title = '';
        this.getEvents = this.getEvents.bind(this);
    }


    async componentDidMount() {
        await this.getEvents();
    }

    render() {
        return (
            <div id="scrollableDiv" className="full-height" style={{  overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={13}
                    next={this.getEvents}
                    hasMore={this.state.hasMoreItems}
                    loader={<AppLoading />}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.9}
                >
                    <div className="event-list">
                        {this.state.eventDetails &&
                            this.state.eventDetails.map((event: EventDetailsViewModel) => (
                                <EventListItem key={event.event.Id} eventDetails={event} />
                            ))}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }

    private async getEvents() {
        this.eventRequest.pageIndex = this.state.pageIndex;
        let result = await EventService.Find(this.eventRequest);
        result.Data.forEach(element => {
            this.eventDetilsContainer.push(element);
        });
        if (this.eventDetilsContainer.length >= result.Total) {
            this.setState({
                hasMoreItems: false,
            });
        }
        this.setState({
            eventDetails: this.eventDetilsContainer,
            pageIndex:this.eventRequest.pageIndex+1,
        });
    }

   
}

export default EventList;
