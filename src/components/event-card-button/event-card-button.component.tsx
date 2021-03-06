import React, { Component } from 'react';
import './event-card-button.component.scss';
import EventHelper from '../../helpers/event.helper';
import { Button, Row, Col } from 'antd';
import { EventCardButtonProps } from './event-card-button.props';

export class EventCardButton extends Component<EventCardButtonProps> {
  render() {
    return this.getButton();
  }

  private getButton() {
    let button = <div />;
    const isAvailable = EventHelper.isAvailable(this.props.event);
    const isAlreadyAccepted = EventHelper.isUserAccepted(this.props.event, this.props.userId);
    const isInPending = EventHelper.isUserPending(this.props.event, this.props.userId);
    const isOwner = EventHelper.isOwner(this.props.event, this.props.userId);
    const isUnavailable = !this.props.event.status;
    const isAlreadyPast = EventHelper.isAlreadyPast(this.props.event);
    const isHappeningNow = EventHelper.isHappeningNow(this.props.event);

    if (!this.props.event.event.Id) {
      return null;
    }

    if (!isUnavailable && !isAlreadyPast && !isHappeningNow && isOwner) {
      button = this.getCancelButton();
    } else if (!isUnavailable && isAlreadyAccepted && !isAlreadyPast && !isHappeningNow) {
      button = this.getApprovedButton();
    } else if (
      !isUnavailable &&
      !isAlreadyPast &&
      !isHappeningNow &&
      (isInPending || this.props.requestSent)
    ) {
      button = this.getPendingButton();
    } else if (!isUnavailable && !isAlreadyPast && !isHappeningNow && isAvailable && !isOwner) {
      button = this.getJoinButton();
    } else if (!isUnavailable && isAlreadyPast) {
      button = this.getAlreadyPastButton();
    } else if (!isUnavailable && isHappeningNow) {
      button = this.getHappeningNowButton();
    } else if (isUnavailable) {
      button = this.getUnavailableButton();
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

  private getCancelButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={16} className="join-text">
          <span
            onClick={e => {
              this.props.onEditClick();
            }}
          >
            Editeaza
          </span>
        </Col>
        <Col span={8} className="text-right">
          <Button
            type="ghost"
            size="large"
            shape="circle"
            icon="edit"
            className="join-button"
            onClick={e => {
              this.props.onEditClick();
            }}
          ></Button>
        </Col>
      </Row>
    );
  }

  private getPendingButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={16} className="join-text">
          Cerere trimisa
        </Col>
        <Col span={8} className="text-right">
          <Button
            type="ghost"
            size="large"
            shape="circle"
            icon="check"
            disabled
            className="join-button"
          ></Button>
        </Col>
      </Row>
    );
  }

  private getApprovedButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={16} className="join-text">
          Ai fost acceptat
        </Col>
        <Col span={8} className="text-right">
          <Button
            type="primary"
            size="large"
            shape="circle"
            icon="check"
            disabled
            className="join-button accepted"
          ></Button>
        </Col>
      </Row>
    );
  }

  private getUnavailableButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={16} className="join-text">
          Eveniment Anululat
        </Col>
        <Col span={8} className="text-right">
          <Button
            type="ghost"
            size="large"
            shape="circle"
            icon="close"
            disabled
            className="join-button"
          ></Button>
        </Col>
      </Row>
    );
  }

  private getAlreadyPastButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={24} className="join-text">
          Eveniment Expirat
        </Col>
      </Row>
    );
  }

  private getHappeningNowButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={24} className="join-text">
          Eveniment in derulare
        </Col>
      </Row>
    );
  }
}
