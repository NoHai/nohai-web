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
          {this.props.eventMembers &&
            members.map((member: ParticipantModel) => (
              <Avatar key={member.Id} size={this._size} src={AvatarHelper.get(member.Url)} />
            ))}
        </div>
        <EventMembersListModal
          showModal={this.state.showModal}
          members={members}
          onClose={() => this.showModal(false)}
        ></EventMembersListModal>
      </div>
    );
  }

  showModal(show: boolean) {
    this.setState({
      showModal: show,
    });
  }
}

export default EventMembers;
