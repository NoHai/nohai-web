import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { NotificationCardProps } from './notification-card.props';
import { ActionType, ActionButtonType } from '../../contracts/enums/common';

class NotificationCard extends Component<NotificationCardProps> {
    render() {
        return (
            <div className="item-card">
                <Row
                    onClick={() => {
                        this.onButtonClickHandler(ActionButtonType.Info);
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
                            {this.props.user.FirstName} {this.getNotificationType()}
                        </div>

                        <p>{this.props.event.Description}</p>
                    </Col>
                </Row>
                {this.getCardButtons()}
            </div>
        );
    }

    getNotificationType() {
        switch (this.props.actionType) {
            default:
                return <span>ti-a trimis o cerere</span>;
            case ActionType.Request:
                return <span>ti-a trimis o cerere</span>;
            case ActionType.Accept:
                return <span>a acceptat cererea ta pentru {this.props.event.Name}</span>;
            case ActionType.Reject:
                return <span>a refuzat cererea ta pentru {this.props.event.Name}</span>;
        }
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
                                this.onButtonClickHandler(ActionButtonType.Reject);
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
                                this.onButtonClickHandler(ActionButtonType.Approve);
                            }}
                        >
                            Accepta
                        </Button>
                    </Col>
                </Row>
            );
        }
    }

    private onButtonClickHandler(action: ActionButtonType) {
        if (this.props.onButtonClick) {
            this.props.onButtonClick(action, this.props.id);
        }
    }
}

export default NotificationCard;
