import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { NotificationCardProps } from './notification-card.props';
import { ActionType, ActionButtonType } from '../../contracts/enums/common';

class NotificationCard extends Component<NotificationCardProps> {
    render() {
        let cssClass= this.props.status===0? "not-read item-card":"item-card";
        return (
            
            <div className={cssClass}>
                <Row
                    onClick={() => {
                        this.onButtonClickHandler(ActionButtonType.Info);
                    }}
                >
                    <Col span={3}>
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url(${this.props.avatarUrl})`,
                            }}
                        />
                    </Col>
                    <Col span={21}>
                        <div className="item-card-title">
                            {this.props.title}
                        </div>

                        <p>{this.props.body}</p>
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
                            className="link gray-color"
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
            this.props.onButtonClick(action,this.props.id, this.props.eventId);
        }
    }
}

export default NotificationCard;
