import React, { Component } from 'react';
import './event-item-card.component.scss';
import { Row, Col } from 'antd';

class EventItemCard extends Component {
    render() {
        return (
            <div className="item-card">
                <Row>
                    <Col span={5}>
                        <div className="item-card-picture" />
                    </Col>
                    <Col span={19}>
                        <div className="item-card-title">Sergiu cauta colegi pentru alergat</div>

                        <p>
                            Vivamus pellentesque orci et gravida laoreet. Phasellus gravida
                            efficitur elit sed rutrum.
                        </p>
                    </Col>
                </Row>

                <Row className="item-card-icons">
                    <Col span={8}>
                        <span className="icon mdi mdi-map-marker" />
                        <span className="text">Constanta</span>
                    </Col>
                    <Col span={10} className="text-center">
                        <span className="icon mdi mdi-alarm" />
                        <span className="text">10/12/2019, 13:30</span>
                    </Col>
                    <Col span={6} className="text-right">
                        <span className="icon mdi mdi-account-group" />
                        <span className="text">7/12</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EventItemCard;
