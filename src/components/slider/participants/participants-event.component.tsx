import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './participants-event.component.scss';
import SportsSelection from '../../sports-selection/sports-selection.component';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action';
import { validate } from 'class-validator';
import { EventDetailsViewModel } from '../../../contracts/models';
import { registerSchema } from 'class-validator';
import { ParticipantsDetailsSchema } from './../../../contracts/schemas/participants-details.schema';
registerSchema(ParticipantsDetailsSchema);

class ParticipantsEventCompnoent extends Component<any, any> {
    async handleChange(event: any) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { name, value } = event.target;
        eventDetails.participantsDetails[name] = value ? parseInt(value, 10) : value;
        eventDetails.participantsDetails.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async chekIfIsValid(model: EventDetailsViewModel) {
        let error = await validate('participantsDetailsSchema', model.participantsDetails);
        return error.length === 0;
    }

    public render() {
        return (
            <div className="participants-form">
                 <div className="slide-title">Detalii participantii
                 <div className="mdi mdi-account-group"></div>
                 </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Sportul:</span>
                        </Col>
                        <Col span={12}>
                            <SportsSelection />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col span={12}>
                            <span>Total Locuri:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="number"
                                placeholder="Total Locuri"
                                data-lpignore="true"
                                name="TotalParticipants"
                                value={
                                    this.props.eventDetails.participantsDetails.TotalParticipants
                                }
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col span={12}>
                            <span>Locuri Disponibile:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="number"
                                placeholder="Locuri Disponibile"
                                data-lpignore="true"
                                name="FreeSpots"
                                value={this.props.eventDetails.participantsDetails.FreeSpots}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col span={12}>
                            <span>Pret Participant:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="number"
                                placeholder="Pret Participant"
                                data-lpignore="true"
                                name="PriceForParticipant"
                                value={
                                    this.props.eventDetails.participantsDetails.PriceForParticipant
                                }
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ eventReducer }: any) => {
    return {
        eventDetails: eventReducer.eventDetails,
    };
};

const mapDispatchToProps = {
    changeEventDetails,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantsEventCompnoent);
