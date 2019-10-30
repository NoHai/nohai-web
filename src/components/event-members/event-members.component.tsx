import React, { Component } from 'react';
import './event-members.component.scss';
import { Avatar, List } from 'antd';
import { EventMembersProps } from './event-members.component.props';
import { ParticipantModel } from '../../contracts/models/participant.model';
import AvatarHelper from '../../helpers/avatar.helper';
import EventMembersList from '../event-members-list/event-members-list';

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
        <EventMembersList
          title="Participanti"
          showModal={this.state.showModal}
          onClose={() => this.showModal(false)}
        >
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={members}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={this._size} src={AvatarHelper.get(item.Url)} />}
                  title={
                    <p>
                      {item.FirstName} {item.LastName}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        </EventMembersList>
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
