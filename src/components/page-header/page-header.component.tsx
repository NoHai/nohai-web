import React, { Component } from 'react';
import './page-header.component.scss';
import { Row, Col } from 'antd';
import history from '../../utilities/core/history';
import UserIconButton from '../user-icon-button/user-icon-button';

class PageHeader extends Component {
    render() {
        return (
            <div className="page-header page-section">
                <Row>
                    <Col span={8}>
                        <div
                            onClick={() => {
                                this.NavigateToNotification();
                            }}
                            className="icon mdi mdi-bell notification"
                        >
                            <span className="badge">3</span>
                        </div>
                    </Col>
                    <Col span={8} className="text-center" />
                    <Col span={8} className="text-right">
                        <UserIconButton />
                    </Col>
                </Row>
            </div>
        );
    }

    private NavigateToNotification() {
        history.push('/notification');
    }
}

export default PageHeader;
