import React, { Component } from 'react';
import './event-card-button.component.scss';
import EventHelper from '../../helpers/event.helper';
import { Button, Alert } from 'antd';
import { EventCardButtonProps } from './event-card-button.props';

export class EventCardButton extends Component<EventCardButtonProps> {
  render() {
    return !EventHelper.isOwner(this.props.event, this.props.userId) && this.getButton();
  }

  private getButton() {
    let button = <div />;
    const isAvailable = EventHelper.isAvailable(this.props.event);
    const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.event, this.props.userId);
    const isInPending = EventHelper.isUserPending(this.props.event, this.props.userId);

    if (isAlreadyAccepted) {
      button = this.getApprovedButton();
    } else if (isInPending || this.props.requestSent) {
      button = this.getPendingButton();
    } else if (isAvailable) {
      button = this.getJoinButton();
    }

    return <div className="event-card-button">{button}</div>;
  }

  private getJoinButton() {
    return (
      <Button
        type="primary"
        size="large"
        block
        className="join-button"
        onClick={() => {
          this.props.onJoinClick();
        }}
      >
        <span className="icon mdi mdi-hand" />
        Vreau si eu
      </Button>
    );
  }

  private getPendingButton() {
    return (
      <Button
        type="ghost"
        size="large"
        shape="circle"
        icon="check"
        disabled
        className="join-button"
      ></Button>
    );
  }

  private getApprovedButton() {
    return (
      <Button
        type="primary"
        size="large"
        shape="circle"
        icon="check"
        disabled
        className="join-button accepted"
      ></Button>
    );
  }
}
