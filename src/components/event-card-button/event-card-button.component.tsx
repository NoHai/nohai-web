import React, { Component } from 'react';
import './event-card-button.component.scss';
import EventHelper from '../../helpers/event.helper';
import { Button, Row, Col, Modal } from 'antd';
import { EventCardButtonProps } from './event-card-button.props';

const { confirm } = Modal;

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

    if (isOwner) {
      button = this.getCancelButton();
    } else if (isAlreadyAccepted) {
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

  private getCancelButton() {
    return (
      <Row type="flex" align="middle">
        <Col span={16} className="join-text">
          Anuleaza
        </Col>
        <Col span={8} className="text-right">
          <Button
            type="ghost"
            size="large"
            shape="circle"
            icon="close"
            className="join-button"
            onClick={(e) => {
              this.cancelEvent(this.props);
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

  private cancelEvent(props: any){
    confirm({
      title: 'Esti sigur ca vrei sa anulezi evenimentul?',
      okText: 'Anuleaza',
      okType: 'danger',
      cancelText: 'Nu doresc',
      onOk() {
        props.onCancelClick()
      },
      onCancel() {
      },
    });
  }
}
