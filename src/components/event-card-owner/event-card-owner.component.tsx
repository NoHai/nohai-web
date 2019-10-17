import React, { Component } from 'react';
import './event-card-owner.component.scss';
import { Avatar } from 'antd';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';

class EventCardOwner extends Component<{ owner: ParticipantModel }> {
  render() {
    return (
      <div className="event-card-owner">
        <Avatar size={42} src={AvatarHelper.get(this.props.owner.Url)} />
        <span className="event-card-owner-title">
          {this.props.owner.FirstName} {this.props.owner.LastName}
        </span>
      </div>
    );
  }
}

export default EventCardOwner;
