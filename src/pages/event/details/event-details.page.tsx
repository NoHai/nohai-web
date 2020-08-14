import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventCard from '../../../components/event-card/event-card.component';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import { CommentRepository } from '../../../data/repositories/comment.repository';
import {
  getEventDetails,
  resetEventDetails,
  setEventDetailsState,
} from '../../../redux/actions/event-details.action';
import { initialnEventDetailsReducerState } from '../../../redux/reducers/event-details.reducer';
import './event-details.page.scss';

class EventDetailsPage extends Component<any, any> {
  eventComments = [];
  state = {
    eventComments: [],
  };
  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      this.props.getEventDetails(this.props.match.params.id);
      this.eventComments = await CommentRepository.getCommentsForEvent(this.props.match.params.id);
      this.setState({ eventComments: this.eventComments });
    } else {
      this.props.setEventDetailsState(
        JSON.parse(localStorage.getItem(LocalStorage.CreateEvent) || '{}')
      );
    }
  }

  async componentWillMount() {
    this.props.resetEventDetails();
  }

  render() {
    return (
      <div className="event-list-item">
        <EventCard
          eventDetails={this.props.eventDetails}
          eventComments={this.state.eventComments}
        />
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
  getEventDetails,
  resetEventDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);
