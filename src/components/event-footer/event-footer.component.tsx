import React, { Component } from 'react';
import './event-footer.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import { EventFooterProps } from './event-footer.component.props';

class EventFooter extends Component<EventFooterProps> {
  render() {
    const leftButtonClas = 'mdi-chevron-left-circle-outline';
    const rightButtonClas = 'mdi-chevron-right-circle-outline';

    return (
      <div className="event-footer-component">
        <Row type="flex" align="middle" className="footer-row">
          <Col span={8} className="text-center">
            {this.props.showLeftButton && (
              <div
                className={`page-footer-link active`}
                onClick={() => {
                  this.leftButtonClick();
                }}
              >
                <span className={`icon mdi ${leftButtonClas}`} />
                <div className="page-footer-text">Inapoi</div>
              </div>
            )}
          </Col>

          <Col span={8} className="text-center"></Col>

          <Col span={8} className="text-center">
            <div
              className={`page-footer-link ${this.props.isValid ? 'active' : ''}`}
              onClick={() => {
                this.rightButtonClick();
              }}
            >
              <span className={`icon mdi ${rightButtonClas}`} />
              <div className="page-footer-text">Inainte</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  private centerButtonClick() {
    if (this.props.onCenterButtonClick) this.props.onCenterButtonClick();
  }

  private leftButtonClick() {
    if (this.props.onLeftButtonClick) this.props.onLeftButtonClick();
  }

  private rightButtonClick() {
    if (this.props.onRightButtonClick && this.props.isValid) this.props.onRightButtonClick();
  }
}

export default EventFooter;
