import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { NotificationCardProps } from './notification-card.props';
import { ActionType } from '../../contracts/enums/common';
import history from '../../utilities/core/history';

class NotificationCard extends Component<NotificationCardProps> {
    render() {
        return (
            <div className="item-card">
                <Row
                    onClick={() => {
                        this.NavigateToEventDetails();
                    }}
                >
                    <Col span={3}>
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: this.props.user.Url,
                            }}
                        />
                    </Col>
                    <Col span={21}>
                        <div className="item-card-title">
                            {this.props.user.FirstName}{' '}
                            {this.props.actionType === 0 && <span>someting </span>}
                        </div>

                        <p>{this.props.event.Description}</p>
                    </Col>
                </Row>
                {this.getCardButtons()}
            </div>
        );
    }

    getCardButtons() {
        if (this.props.actionType === ActionType.Request) {
            return (
                <Row className="item-card-icons">
                    <Col span={12} />
                    <Col span={6} className="text-center">
                        <Button
                            type="link"
                            className="link red-color"
                            block
                            onClick={() => {
                                this.RejectRequest();
                            }}
                        >
                            Refuza
                        </Button>
                    </Col>
                    <Col span={6} className="text-right">
                        <Button
                            type="primary"
                            block
                            onClick={() => {
                                this.ApproveRequest();
                            }}
                        >
                            Accepta
                        </Button>
                    </Col>
                </Row>
            );
        }
    }

    private NavigateToEventDetails() {
        history.push('/details');
    }

    private RejectRequest() {
       window.alert(this.props.id);
    }

    private ApproveRequest() {
        window.alert(this.props.event.Description);
    }
}

export default NotificationCard;
