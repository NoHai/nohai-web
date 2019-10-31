import React, { Component } from 'react';
import './event-members-list.modal.scss';
import { EventMembersListModalProps } from './event-members-list.modal.props';
import GenericModal from '../../generic-modal/generic.modal';
import { List } from 'antd';
import EventMembersListItemModal from '../event-members-list-item.modal/event-members-list-item.modal';

class EventMembersListModal extends Component<EventMembersListModalProps> {
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
            <EventMembersListItemModal
              isOwner={this.props.isOwner}
              member={item}
              onKickoutParticipant={e => this.props.onKickoutParticipant(e)}
            ></EventMembersListItemModal>
          )}
        />
      </GenericModal>
    );
  }
}

export default EventMembersListModal;
