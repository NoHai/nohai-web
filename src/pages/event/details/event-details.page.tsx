import React, { Component } from 'react';
import './event-details.page.scss';
import EventCard from '../../../components/event-card/event-card.component';
import { EventService } from '../../../business/services';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import { connect } from 'react-redux';
import { initialnEventDetailsReducerState } from '../../../redux/reducers/event-details.reducer';
import { setEventDetailsState } from '../../../redux/actions/event-details.action';

class EventDetailsPage extends Component<any, any> {
  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      const eventDetails = await EventService.Get(this.props.match.params.id);
      this.props.setEventDetailsState(eventDetails);
    } else {
      this.props.setEventDetailsState(
        JSON.parse(localStorage.getItem(LocalStorage.CreateEvent) || '{}')
      );
    }
  }
  render() {
    return (
      <div className="event-list-item">
        <EventCard eventDetails={this.props.eventDetails} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  if (state.eventDetailsReducer) {
    return {
      eventDetails: state.eventDetailsReducer.eventDetails,
    };
  }

  return initialnEventDetailsReducerState;
};

const mapDispatchToProps = {
  setEventDetailsState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsPage);
