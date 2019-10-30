import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar } from 'antd';
import { EventMembersProps } from './event-members.component.props';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';
import EventMembersListModal from '../modals/event/event-members-list/event-members-list.modal';

class EventMembers extends Component<EventMembersProps> {
  private _size: number = 34;
  state = {
    showModal: false,
  };

  render() {
    const members = this.props.eventMembers.filter((member: any) => member.Status === 1);
    return (
      <div>
        <div className="event-members" onClick={() => this.showModal(true)}>
          {this.displayParticipants(members)}
        </div>
        <EventMembersListModal
          showModal={this.state.showModal}
          members={members}
          onClose={() => this.showModal(false)}
        ></EventMembersListModal>
      </div>
    );
  }

  displayParticipants(members: Array<ParticipantModel>) {
    const participants = new Array<any>();
    const displayNumber = 3;
    const extraParticipants= members.length-displayNumber;

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

  showModal(show: boolean) {
    this.setState({
      showModal: show,
    });
  }
}

export default EventMembers;
