import React, { Component } from 'react';
import './event-members-list-item.modal.scss';
import { EventMembersListItemModalProps } from './event-members-list-item.modal.props';
import { List, Avatar, Typography, Row, Col, Button } from 'antd';
import AvatarHelper from '../../../../helpers/avatar.helper';

class EventMembersListItemModal extends Component<EventMembersListItemModalProps> {
  state = {
    show: false,
  };

  private _size = 30;
  render() {
    const modalClass = this.state.show ? 'open' : '';

    return (
      <Row onBlur={() => this.toggleMessage(false)}>
        <List.Item className="list-item-container">
          <Col span={16}>
            <Typography.Text>
              {<Avatar size={this._size} src={AvatarHelper.get(this.props.member.Url)} />}
            </Typography.Text>{' '}
            {this.props.member.FirstName} {this.props.member.LastName}
          </Col>
          {this.props.isOwner && !this.props.isEventStartedOrPased && (
            <Col span={8} className="text-right">
              <Button
                size="default"
                type="danger"
                className="close-button"
                onClick={() => {
                  this.toggleMessage(true);
                }}
              >
                Elimina
              </Button>
            </Col>
          )}

          <div className={`list-item-delete-box ${modalClass}`}>
            <span className="list-item-delete-box-title">Esti sigur?</span>
            <Button
              className="action-button"
              size="default"
              type="default"
              onClick={() => {
                this.toggleMessage(false);
              }}
            >
              Nu
            </Button>
            <Button
              className="action-button"
              size="default"
              type="danger"
              onClick={() => {
                this.props.onKickoutParticipant(this.props.member.Id);
              }}
            >
              Da
            </Button>
          </div>
        </List.Item>
      </Row>
    );
  }

  private toggleMessage(show: boolean) {
    this.setState({
      show: show,
    });
  }
}

export default EventMembersListItemModal;
