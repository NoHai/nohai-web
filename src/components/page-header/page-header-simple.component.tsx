import { Col, Row } from 'antd';
import React, { Component } from 'react';
import HistoryHelper from '../../utilities/core/history';
import './page-header.component.scss';

class PageHeaderTerms extends Component<any, any> {
  render(): any {
    return (
      <div className="page-header page-section">
        <Row type="flex" align="middle">
          <Col span={12}>
            <div
              onClick={() => {
                this.NavigateBack();
              }}
              className="icon mdi mdi-arrow-left"
            ></div>
          </Col>
        </Row>
      </div>
    );
  }
  private NavigateBack() {
    HistoryHelper.goBack();
  }
}

export default PageHeaderTerms;
