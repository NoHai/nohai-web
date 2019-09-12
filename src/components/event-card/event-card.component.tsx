import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button, Avatar } from 'antd';
import EventTags from '../event-tags/event-tags.component';
import EventMembers from '../event-members/event-members.component';
import EventMap from '../event-map/event-map.component';
import { EventService } from '../../business/services';
import history from '../../utilities/core/history';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';

class EventCard extends Component<any, any> {
    private isForPreview = false;
    constructor(props: any) {
        super(props);

        this.state = {
            eventDetails: this.props.eventDetails,
        };
        this.isForPreview = window.location.pathname === '/preview';
    }

    render() {
        return (
            <div className="item-card event-card">
                <Row>
                    <Col span={5}>
                        <div className="item-card-picture" />
                    </Col>
                    <Col span={19}>
                        <div className="item-card-title">{this.props.eventDetails.event.Name}</div>

                        <div className="item-card-options">
                            <div className="item-card-option">
                                <span className="icon mdi mdi-alarm" />
                                {this.props.eventDetails.description.Date},{' '}
                                {this.props.eventDetails.description.Time}
                            </div>
                            <div className="item-card-option">
                                <span className="icon mdi mdi-map-marker" />
                                {this.props.eventDetails.locationDetails.Address}{' '}
                                {this.props.eventDetails.locationDetails.City}
                            </div>
                        </div>
                    </Col>
                </Row>

                <EventTags
                    Sport={this.props.eventDetails.participantsDetails.Sport}
                    Level={this.props.eventDetails.participantsDetails.Level}
                    Price={this.props.eventDetails.participantsDetails.PriceForParticipant}
                />

                {!this.isForPreview && (
                    <Row type="flex" align="middle">
                        <Col span={12}>
                            <EventMembers />
                        </Col>
                        <Col span={12} className="text-right">
                            <Button
                                type="primary"
                                size="large"
                                block
                                className="join-button"
                                onClick={() => {
                                    this.joinEvent();
                                }}
                            >
                                <span className="icon mdi mdi-hand" />
                                Vreau si eu
                            </Button>
                        </Col>
                    </Row>
                )}

                <hr />

                <p>{this.props.eventDetails.description.Description}</p>

                {!this.isForPreview && (
                    <div className="text-right margin-bottom">
                        <Avatar size={24} src="https://randomuser.me/api/portraits/women/44.jpg" />
                        Andreea Stanchi
                    </div>
                )}

                <div className="sub-title">Unde ne intalnim?</div>

                <EventMap latitude={this.props.eventDetails.locationDetails.Latitude} longitude={this.props.eventDetails.locationDetails.Longitude} />

                {this.isForPreview && (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.createEvent();
                            }}
                        >
                            Creaza evenimentul
                        </Button>
                    </div>
                )}
            </div>
        );
    }
    private async createEvent() {
        const id = await EventService.Create(this.props.eventDetails);
        if (id) {
            LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
            alert(id);
            history.push('/');
        }
    }

    private async joinEvent() {
        const id = await EventService.Join(this.props.eventDetails.event.Id);
        if (id) {
            LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
            alert(id);
            history.push('/');
        }
    }
}

export default EventCard;
