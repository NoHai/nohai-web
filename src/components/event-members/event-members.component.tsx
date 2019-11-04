import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar } from 'antd';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';
import EventMembersListModal from '../modals/event/event-members-list/event-members-list.modal';
import { connect } from 'react-redux';
import { initialnEventDetailsReducerState } from '../../redux/reducers/event-details.reducer';
import { showMembersModalChange } from '../../redux/actions/event-details.action';

class EventMembers extends Component<any, any> {
  private _size: number = 34;

  render() {
    const members = this.props.members
      ? this.props.members.filter((member: any) => member.Status === 1)
      : new Array<any>();
    return (
      <div>
        <div className="event-members" onClick={() => this.props.showMembersModalChange(true)}>
          {this.displayParticipants(members)}
        </div>
        <EventMembersListModal> </EventMembersListModal>
      </div>
    );
  }

  displayParticipants(members: Array<ParticipantModel>) {
    const participants = new Array<any>();
    const displayNumber = 3;
    const extraParticipants = members.length - displayNumber;

    if (members && members.length > 0) {
      const displayMembers =
        members.length > displayNumber ? members.slice(0, displayNumber) : members;
      displayMembers.forEach((m, index) => {
        participants.push(<Avatar key={index} size={this._size} src={AvatarHelper.get(m.Url)} />);
      });

      if (members.length > displayNumber) {
        participants.push(
          <Avatar className="extra-members" key={4} size={this._size} src={''}>
            +{extraParticipants}
          </Avatar>
        );
      }
    }

    return participants;
  }
}
const mapStateToProps = (state: any) => {
  if (state.eventDetailsReducer) {
    return {
      members: state.eventDetailsReducer.eventDetails.participants,
    };
  }
  return initialnEventDetailsReducerState;
};

const mapDispatchToProps = {
  showMembersModalChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMembers);
