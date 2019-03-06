import React, { Component } from 'react';
import './event-list-item.component.scss';
import { Card, Row, Col } from 'antd';

class EventListItem extends Component {
    render() {
        return (
            <div className="event-list-item" style={{ backgroundImage: this.GenerateGradient() }}>
                <div className="item-card">
                    <Row>
                        <Col span={5}>
                            <div className="item-card-picture" />
                        </Col>
                        <Col span={19}>
                            <div className="item-card-title">
                                Sergiu cauta colegi pentru alergat
                                <p>
                                    Vivamus pellentesque orci et gravida laoreet. Phasellus gravida
                                    efficitur elit sed rutrum.
                                </p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="item-card-icons">
                        <Col span={8}>
                            <span className="icon mdi mdi-map-marker" />
                            Constanta
                        </Col>
                        <Col span={10} className="text-center">
                            <span className="icon mdi mdi-alarm" />
                            10/12/2019, 13:30
                        </Col>
                        <Col span={6} className="text-right">
                            <span className="icon mdi mdi-account-group" />
                            7/12
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    private GenerateGradient(): string {
        const intR = Math.floor(Math.random() * 255) + 1;
        const intG = Math.floor(Math.random() * 255) + 1;
        const intB = Math.floor(Math.random() * 255) + 1;
        return `linear-gradient(rgba(${intR}, ${intG}, ${intB}, .01), rgba(${intR}, ${intG}, ${intB}, .08))`;
    }
}

export default EventListItem;
