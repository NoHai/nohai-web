import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col } from 'antd';

class EventCard extends Component {
    render() {
        return (
            <div className="item-card">
                <Row>
                    <Col span={5}>
                        <div className="item-card-picture" />
                    </Col>
                    <Col span={19}>
                        <div className="item-card-title">Sergiu cauta colegi pentru alergat</div>

                        <div className="item-card-options">
                            <div className="item-card-option">
                                <span className="icon mdi mdi-alarm" />
                                10/12/2019, 18:30
                            </div>
                            <div className="item-card-option">
                                <span className="icon mdi mdi-map-marker" />
                                General Eremia Grigorescu, no.7, Sibiu
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EventCard;
