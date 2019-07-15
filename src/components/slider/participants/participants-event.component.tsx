import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SportsSelection from '../../sports-selection/sports-selection.component';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action'; 

class ParticipantsEventCompnoent extends Component<any, any> {
    // state = {
    //     participantsDetails: this.props.participantsDetails,
    // };
    handleChange(event: any) {
        const { name, value } = event.target;
        let participantsDetails: any = this.props.eventDetails.participantsDetails;

        participantsDetails[name] = value ? parseInt(value, 10) : value;
        this.props.eventDetails.participantsDetails=participantsDetails;

        changeEventDetails(this.props.eventDetails)
    }

    public render() {
        return (
            <div>
                <div>
                    <Row>
                        <Col span={6}>
                            <span>Sportul:</span>
                        </Col>
                        <Col span={18}>
                            <SportsSelection />
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col span={10}>
                            <span>Total Locuri:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="number"
                                placeholder="Total Locuri"
                                data-lpignore="true"
                                name="TotalParticipants"
                                value={this.props.eventDetails.participantsDetails.TotalParticipants}
                                onChange={e => this.handleChange(e)}
                            />

                            {!this.props.eventDetails.participantsDetails.TotalParticipants && (
                                <div>error</div>
                            )}
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
                            {!this.props.eventDetails.participantsDetails.FreeSpots && (
                                <div>error</div>
                            )}
                        </Col>
                    </Row>
                </div>

                <div>
                    <span>Pret Participant:</span>
                    <input
                        type="number"
                        placeholder="Pret Participant"
                        data-lpignore="true"
                        name="PriceForParticipant"
                        value={this.props.eventDetails.participantsDetails.PriceForParticipant}
                        onChange={e => this.handleChange(e)}
                    />
                    {!this.props.eventDetails.participantsDetails.PriceForParticipant && (
                        <div>error</div>
                    )}
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
