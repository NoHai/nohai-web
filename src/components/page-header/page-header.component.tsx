import React, { Component } from 'react';
import './page-header.component.scss';
import { Row, Col } from 'antd';
import UserIconButton from '../user-icon-button/user-icon-button';
import PageBackButton from '../page-back-button/page-back-button.component';

class PageHeader extends Component<any, any> {
  render(): any {
    return (
      <div className="page-header page-section">
        <Row>
          <Col span={8}>
            <PageBackButton />
          </Col>

          <Col span={8} className="text-center" />

          <Col span={8} className="text-right">
            <UserIconButton />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageHeader;
