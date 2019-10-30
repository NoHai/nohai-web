import React, { Component } from 'react';
import './event-members-list.scss';
import { EventMembersListProps } from './event-members-list.component.props';
import { Button, Row, Col } from 'antd';

class EventMembersList extends Component<EventMembersListProps> {
  private _size = 34;

  render() {
    const modalClass = this.props.showModal ? 'open' : '';
    return (
      <div className={`event-member-list ${modalClass}`}>
        <div className="bg-modal">
          <div className="modal-content">
            <div className="page-sections">
              <div className="page-section">{this.getModalHeader()}</div>
              <div className="page-section page-section-large">{this.getModalBody()}</div>
              <div className="page-section">{this.getModalFooter()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getModalHeader() {
    return (
      <div className="modal-section-footer">
        <Row type="flex" align="middle">
          <Col span={12}>
            <h2>{this.props.title}</h2>
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="ghost"
              shape="circle"
              icon="close"
              onClick={() => {
                this.props.onClose();
              }}
            ></Button>
          </Col>
        </Row>
      </div>
    );
  }

  private getModalFooter() {
    return (
      <div className="modal-section-header">
        <Row type="flex" align="middle">
          <Col span={12}></Col>
          <Col span={12} className="text-right">
            <Button
              type="primary"
              onClick={() => {
                this.props.onClose();
              }}
            >
              OK
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  private getModalBody() {
    return <div className="modal-section-body">{this.props.children}</div>;
  }
}

export default EventMembersList;
