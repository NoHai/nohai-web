import React, { Component } from 'react';
import './create-event-footer.component.scss';
import { Row, Col } from 'antd';
import { CreateEventFooterProps } from './create-event-footer.component.props';

class CreateEventFooter extends Component<CreateEventFooterProps> {
  render() {
    const leftButtonClass = this.props.LeftButtonIcon
      ? this.props.LeftButtonIcon
      : 'mdi-chevron-left-circle-outline';
    const centerButtonClass = this.props.CenterButtonIcon
      ? this.props.CenterButtonIcon
      : 'mdi-chevron-right-circle-outline';
    const rightButtonClass = this.props.RightButtonIcon
      ? this.props.RightButtonIcon
      : 'mdi-chevron-right-circle-outline';

    const leftButtonText = this.props.LeftButtonIcon ? this.props.LeftButtonText : 'Inapoi';
    const centerButtonText = this.props.CenterButtonText ? this.props.CenterButtonText : 'Editeaza';
    const rightButtonText = this.props.RightButtonIcon ? this.props.RightButtonText : 'Inainte';

    const colSize = this.props.ShowCenterButton ? 8 : 8;

    return (
      <div className="event-footer-component">
        <Row type="flex" align="middle" className="footer-row">
          <Col span={colSize} className="text-center">
            {this.props.showLeftButton && (
              <div
                className={`page-footer-link active`}
                onClick={() => {
                  this.leftButtonClick();
                }}
              >
                <span className={`icon mdi ${leftButtonClass}`} />
                <div className="page-footer-text">{leftButtonText}</div>
              </div>
            )}
          </Col>

          <Col span={8} className="text-center">
            {this.props.ShowCenterButton && (
              <div
                className={`page-footer-link active`}
                onClick={() => {
                  this.centerButtonClick();
                }}
              >
                <span className={`icon mdi ${centerButtonClass}`} />
                <div className="page-footer-text">{centerButtonText}</div>
              </div>
            )}
          </Col>

          <Col span={colSize} className="text-center">
            <div
              className={`page-footer-link ${this.props.isValid ? 'active' : ''}`}
              onClick={() => {
                this.rightButtonClick();
              }}
            >
              <span className={`icon mdi ${rightButtonClass}`} />
              <div className="page-footer-text">{rightButtonText}</div>
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

export default CreateEventFooter;
