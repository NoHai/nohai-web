import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button, Avatar } from 'antd';
import EventTags from '../event-tags/event-tags.component';
import EventMembers from '../event-members/event-members.component';
import EventMap from '../event-map/event-map.component';

class EventCard extends Component {
    render() {
        return (
            <div className="item-card event-card">
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

                <EventTags />

                <Row type="flex" align="middle">
                    <Col span={12}>
                        <EventMembers />
                    </Col>
                    <Col span={12} className="text-right">
                        <Button type="primary" size="large" block className="join-button">
                            <span className="icon mdi mdi-hand" />
                            Vreau si eu
                        </Button>
                    </Col>
                </Row>

                <hr />

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deleniti enim
                    dolorem eum, animi impedit provident dolorum reprehenderit id qui, earum, eaque
                    quo expedita dolore! Vitae voluptas sed, laborum est libero iste repellat
                    tenetur quis quaerat deserunt fugiat, culpa ipsam perspiciatis quia quam tempora
                    quidem itaque voluptate aut delectus doloribus?
                </p>

                <div className="text-right margin-bottom">
                    <Avatar size={24} src="https://randomuser.me/api/portraits/women/44.jpg" />
                    Andreea Stanchi
                </div>

                <div className="sub-title">Unde ne intalnim?</div>

                <EventMap />
            </div>
        );
    }
}

export default EventCard;
