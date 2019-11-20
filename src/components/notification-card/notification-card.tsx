import React, { Component } from 'react';
import './notification-card.scss';
import { Row, Col, Button } from 'antd';
import { NotificationCardProps } from './notification-card.props';
import { ActionType, ActionButtonType } from '../../contracts/enums/common';
import AvatarHelper from '../../helpers/avatar.helper';
import moment from 'moment';

class NotificationCard extends Component<NotificationCardProps> {
  render() {
    const cssClass = this.props.status === 0 ? 'not-read' : '';

    return (
      <div className={`notification-card item-card ${cssClass}`}>
        <Row
          onClick={() => {
            this.onButtonClickHandler(ActionButtonType.Info);
          }}
        >
          <Col span={3}>
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${AvatarHelper.get(this.props.avatarUrl)})`,
              }}
            />
          </Col>
          <Col span={21}>
            <div className="item-card-title">{this.props.title}</div>

            <p>{this.props.body}</p>
          </Col>
        </Row>
        {this.getCardButtons()}
      </div>
    );
  }

  getCardButtons() {
    return (
      <Row className="item-card-icons">
        <Col span={12} className="created-date">
          <span className="created-date">
            {` ${moment(this.props.createdDate)
              .locale('ro')
              .format('dddd')} 
          ${moment(this.props.createdDate).format('DD')}
          ${moment(this.props.createdDate).format('MMMM')}`}
          </span>
        </Col>
        <Col span={6} className="text-center">
          {this.props.actionType === ActionType.Request && (
            <Button
              type="link"
              className="link gray-color"
              block
              onClick={() => {
                this.onButtonClickHandler(ActionButtonType.Reject);
              }}
            >
              Refuza
            </Button>
          )}
        </Col>
        <Col span={6} className="text-right">
          {this.props.actionType === ActionType.Request && (
            <Button
              type="primary"
              block
              onClick={() => {
                this.onButtonClickHandler(ActionButtonType.Approve);
              }}
            >
              Accepta
            </Button>
          )}
        </Col>
      </Row>
    );
  }

  private onButtonClickHandler(action: ActionButtonType) {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(action, this.props.id, this.props.eventId);
    }
  }
}

export default NotificationCard;
