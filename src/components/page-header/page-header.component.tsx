import React, { Component } from 'react';
import './page-header.component.scss';
import { Row, Col } from 'antd';

class PageHeader extends Component {
    render() {
        return (
            <div className="page-header page-section">
                <Row>
                    <Col span={8}>
                        <div className="icon mdi mdi-bell" />
                    </Col>
                    <Col span={8} className="text-center" />
                    <Col span={8} className="text-right">
                        <div
                            className="avatar"
                            style={{
                                backgroundImage:
                                    'url(https://randomuser.me/api/portraits/women/65.jpg)',
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PageHeader;
