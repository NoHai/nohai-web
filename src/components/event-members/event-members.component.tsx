import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar } from 'antd';
import { EventMembersProps } from './event-members.component.props';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';

class EventMembers extends Component<EventMembersProps> {
  private _size: number = 34;

  render() {
    const members = this.props.eventMembers.filter((member: any) => member.Status === 1);
    return (
      <div className="event-members">
        {this.props.eventMembers &&
          members.map((member: ParticipantModel) => (
            <Avatar key={member.Id} size={this._size} src={AvatarHelper.get(member.Url)} />
          ))}
      </div>
    );
  }
}

export default EventMembers;
