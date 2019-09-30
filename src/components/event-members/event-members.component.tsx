import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar } from 'antd';
import { EventMembersProps } from './event-members.component.props';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';

class EventMembers extends Component<EventMembersProps> {
  private _size: number = 34;

  render() {
    return (
      <div className="event-members">
        {this.props.eventMembers &&
          this.props.eventMembers.map((member: ParticipantModel) => (
            <Avatar size={this._size} src={AvatarHelper.get(member.Url)} />
          ))}
        {/* <Avatar size={this._size} src="https://s.gravatar.com/avatar/164726d33219641af544edf1d2f38ada?s=80" />
                <Avatar size={this._size} src="https://randomuser.me/api/portraits/women/44.jpg" />
                <Avatar size={this._size} src="https://randomuser.me/api/portraits/men/85.jpg" />
                <Avatar size={this._size}>+2</Avatar> */}
      </div>
    );
  }
}

export default EventMembers;
