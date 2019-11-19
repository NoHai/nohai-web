import React, { Component } from 'react';
import './generic.modal.scss';
import { GenericModalProps } from './generic.modal.props';
import { Button, Row, Col } from 'antd';

class GenericModal extends Component<GenericModalProps> {
  render() {
    const modalClass = this.props.showModal ? 'open' : '';
    return (
      <div className={`generic-modal ${modalClass}`}>
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
      <div className="modal-section-header">
        <Row type="flex" align="middle">
          <Col span={12}>
            <h2>{this.props.title}</h2>
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="link"
              icon="close"
              size="large"
              className="close-button"
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
      <div className="modal-section-footer">
        <Row type="flex" align="middle">
          <Col span={12}>
            {!this.props.isInfoModal && (
              <Button
                type="default"
                onClick={() => {
                  this.Reset();
                }}
              >
                Reseteaza
              </Button>
            )}
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="default"
              onClick={() => {
                this.props.onClose();
              }}
            >
              Inchide
            </Button>
            {!this.props.isInfoModal && (
              <Button
                className="margin-left"
                type="primary"
                onClick={() => {
                  this.Applay();
                }}
              >
                Aplica
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  }

  private Applay() {
    if (this.props.onApplay) this.props.onApplay();
  }

  private Reset() {
    if (this.props.onReset) this.props.onReset();
  }

  private getModalBody() {
    return <div className="modal-section-body">{this.props.children}</div>;
  }
}

export default GenericModal;
