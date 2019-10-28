import React, { Component } from 'react';
import { Avatar, Modal } from 'antd';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';
import { EventMembersListProps } from './event-members-list.component.props';

class EventMembersList extends Component<EventMembersListProps> {
  private _size: number = 34;

  render() {
    return (
      <div>
        <Modal
          title="Participanti"
          visible={this.props.showModal}
          onOk={this.props.onButtonClick}
          onCancel={this.props.onButtonClick}
        >
          {this.props.eventMembers &&
            this.props.eventMembers.map((member: ParticipantModel) => (
              <div key={member.Id}>
                <Avatar size={this._size} src={AvatarHelper.get(member.Url)} />
                {' - '}
                <span>
                  {member.FirstName} {member.LastName}
                </span>
              </div>
            ))}
        </Modal>
      </div>
    );
  }
}

export default EventMembersList;
