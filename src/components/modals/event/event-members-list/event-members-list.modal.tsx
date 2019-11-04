import React, { Component } from 'react';
import './event-members-list.modal.scss';
import GenericModal from '../../generic-modal/generic.modal';
import { List } from 'antd';
import EventMembersListItemModal from '../event-members-list-item.modal/event-members-list-item.modal';
import { EventService } from '../../../../business/services';
import { connect } from 'react-redux';
import { getEventDetails } from '../../../../redux/actions/event-details.action';
import { initialnEventDetailsReducerState } from '../../../../redux/reducers/event-details.reducer';
import EventHelper from '../../../../helpers/event.helper';
import TokenProvider from '../../../../utilities/providers/token.provider';
class EventMembersListModal extends Component<any, any> {
  private userId = '';

  async componentDidMount() {
    const user = await TokenProvider.getUser();
    user ? (this.userId = user.userId) : (this.userId = '');
  }
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
              eventId={this.props.eventId}
              isOwner={EventHelper.isOwner(this.props.eventDetails, this.userId)}
              member={item}
              onKickoutParticipant={e => this.kickoutParticipant(e)}
            ></EventMembersListItemModal>
          )}
        />
      </GenericModal>
    );
  }

  private async kickoutParticipant(participantId: any) {
    const data = {
      userId: participantId,
      eventId: this.props.eventId,
    };
    const result = await EventService.KickoutParticipant(data);
    if (result) {
      this.props.getEventDetails(this.props.eventId);
    }
  }
}

const mapStateToProps = (state: any) => {
  if (state.eventDetailsReducer) {
    return {
      eventId: state.eventDetailsReducer.eventDetails.event.Id,
      eventDetails: state.eventDetailsReducer.eventDetails,
      members: state.eventDetailsReducer.eventDetails.participants
    };
  }

  return initialnEventDetailsReducerState;
};

const mapDispatchToProps = {
  getEventDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMembersListModal);
