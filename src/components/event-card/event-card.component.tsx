import React, { Component } from 'react';
import './event-card.component.scss';
import { Row, Col, Button, Avatar } from 'antd';
import EventTags from '../event-tags/event-tags.component';
import EventMembers from '../event-members/event-members.component';
import EventMap from '../event-map/event-map.component';
import { connect } from 'react-redux';
import { EventDetailsViewModel } from '../../contracts/models';
import { EventService } from '../../business/services';
import history from '../../utilities/core/history';

class EventCard extends Component<any, any> {
    private isForPreview = false;

    constructor(props: any) {
        super(props);

        this.state = {
            eventDetails: new EventDetailsViewModel(),
        };
        this.isForPreview = window.location.pathname === '/preview';
    }

    private async IntializateState() {
        if (this.isForPreview) {
            this.setState({
                eventDetails: this.props.eventDetails,
            });
        } else {
            const eventDetails = await EventService.Get("21e461a7-9073-430e-b00b-9abd6e0cafd6");
            this.setState({
                eventDetails: eventDetails,
            });
        }
    }
    componentDidMount() {
        this.IntializateState();
    }
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
                                {this.state.eventDetails.description.Date},{' '}
                                {this.state.eventDetails.description.Time}
                            </div>
                            <div className="item-card-option">
                                <span className="icon mdi mdi-map-marker" />
                                {this.state.eventDetails.locationDetails.Address}{' '}
                                {this.state.eventDetails.locationDetails.City}
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
                            <Button type="primary" size="large" block className="join-button">
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

                <EventMap />

                {!this.isForPreview && (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.createEvent();
                            }}
                        >
                            Vizualizeaza
                        </Button>
                    </div>
                )}
            </div>
        );
    }
    private async createEvent() {
        const id = await EventService.Create(this.props.eventDetails);
        alert(id);
        history.push('/');
    }
}

const mapStateToProps = ({ eventReducer }: any) => {
    return {
        eventDetails: eventReducer.eventDetails,
    };
};

export default connect(mapStateToProps)(EventCard);
