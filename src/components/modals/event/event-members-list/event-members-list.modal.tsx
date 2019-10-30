import React, { Component } from 'react';
import './event-members-list.modal.scss';
import { EventMembersListModalProps } from './event-members-list.modal.props';
import GenericModal from '../../generic-modal/generic.modal';
import { List, Avatar, Typography } from 'antd';
import AvatarHelper from '../../../../helpers/avatar.helper';

class EventMembersListModal extends Component<EventMembersListModalProps> {
  private _size = 30;
  render() {
    return (
      <GenericModal
        title="Participanti"
        showModal={this.props.showModal}
        onClose={() => this.props.onClose()}
      >
        <List
          size="small"
          dataSource={this.props.members}
          renderItem={item => (
            <List.Item>
              <Typography.Text>
                {<Avatar size={this._size} src={AvatarHelper.get(item.Url)} />}
              </Typography.Text>{' '}
              {item.FirstName} {item.LastName}
            </List.Item>
          )}
        />
      </GenericModal>
    );
  }
}

export default EventMembersListModal;
