import React, { Component } from 'react';
import './page-footer.component.scss';
import { Row, Col } from 'antd';

class PageFooter extends Component {
    render() {
        return (
            <div className="page-footer page-section">
                <Row type="flex" align="middle">
                    <Col span={8} className="text-center">
                        <div className="icon mdi mdi-ticket" />
                    </Col>
                    <Col span={8} className="text-center">
                        <div className="icon icon-large active mdi mdi-plus-circle" />
                    </Col>
                    <Col span={8} className="text-center">
                        <div className="icon mdi mdi-history" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PageFooter;
