import React, { Component } from 'react';
import './event-details-footer-buttons.scss';
import { Button, Modal } from 'antd';
import { EventDetailsFooterProps } from './event-details-footer-buttons.props';
import EventHelper from '../../helpers/event.helper';
const { confirm } = Modal;

class EventDetailsFooterButtons extends Component<EventDetailsFooterProps> {
  render() {
    const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.event, this.props.userId);
    const isInPending = EventHelper.isUserPending(this.props.event, this.props.userId);
    const isOwner = EventHelper.isOwner(this.props.event, this.props.userId);
    const isUnavailable = !this.props.event.status;
    return (
      <div>
        {!isUnavailable && isOwner
          ? this.cancelEventSection()
          : !isUnavailable && isAlreadyAccepted
          ? this.leaveEventSection()
          : (!isUnavailable && isInPending) || this.props.requestSent
          ? this.cancelPendingRequestSection()
          : ''}
      </div>
    );
  }
  private cancelPendingRequestSection() {
    const isAlreadyAccepted =
      EventHelper.isUserPending(this.props.event, this.props.userId) || this.props.requestSent;
    return (
      isAlreadyAccepted && (
        <div className="create-event-wrapper">
          <div className="sub-title">Te-ai razgandit?</div>
          <p>Nu mai poti ajunge? Anuleaza cererea.</p>

          <Button
            type="default"
            block={true}
            className="margin-bottom"
            onClick={() => {
              this.cancelRequestModal(this);
            }}
          >
            Anuleaza cererea
          </Button>
        </div>
      )
    );
  }

  private leaveEventSection() {
    const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.event, this.props.userId);
    return (
      isAlreadyAccepted && (
        <div className="create-event-wrapper">
          <div className="sub-title">Te-ai razgandit?</div>
          <p>Nu mai poti ajunge? Paraseste evenimentul.</p>

          <Button
            type="default"
            block={true}
            className="margin-bottom"
            onClick={() => {
              this.leaveEventModal(this);
            }}
          >
            Paraseste evenimentul
          </Button>
        </div>
      )
    );
  }

  private cancelEventSection() {
    const isOwner = EventHelper.isOwner(this.props.event, this.props.userId);
    return (
      isOwner && (
        <div className="create-event-wrapper">
          <div className="sub-title">Te-ai razgandit?</div>
          <p>A intervenit ceva? Anuleaza evenimentul.</p>

          <Button
            type="default"
            block={true}
            className="margin-bottom"
            onClick={() => {
              this.cancelEventModal(this);
            }}
          >
            Anuleaza evenimentul
          </Button>
        </div>
      )
    );
  }

  private async leaveEventModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa parasesti evenimentul?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.props.leaveEvent();
      },
      onCancel() {},
    });
  }

  private async cancelRequestModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa anulezi cererea?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.props.cancelRequest();
      },
      onCancel() {},
    });
  }

  private async cancelEventModal(context: any) {
    confirm({
      title: 'Esti sigur ca vrei sa anulezi evenimentul?',
      okText: 'Da',
      okType: 'danger',
      cancelText: 'Nu',
      onOk() {
        context.props.cancelEvent();
      },
      onCancel() {},
    });
  }
}

export default EventDetailsFooterButtons;
