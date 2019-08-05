import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { validate } from 'class-validator';
import { changeEventDetails } from './../../../../redux/actions/event.action';
import { registerSchema } from 'class-validator';
import { EventDetailsViewModel } from '../../../../contracts/models';
import SportsSelection from '../../../../components/sports-selection/sports-selection.component';
import { ParticipantsDetailsSchema } from '../../../../contracts/schemas/participants-details.schema';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';

registerSchema(ParticipantsDetailsSchema);

class ParticipantsDetailsEventPage extends Component<any, any> {
    async handleChange(event: any) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { name, value } = event.target;
        eventDetails.participantsDetails[name] = value ? parseInt(value, 10) : value;
        eventDetails.participantsDetails.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async onCloseDrawer(sport: string, level: string) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        eventDetails.participantsDetails.Sport = sport;
        eventDetails.participantsDetails.Level = level;
        eventDetails.participantsDetails.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async chekIfIsValid(model: EventDetailsViewModel) {
        let error = await validate('participantsDetailsSchema', model.participantsDetails);
        return error.length === 0;
    }

    public render() {
        return (
            <div className="create-event-page event-list-item full-height">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <CreateEventHeaderComponent
                            title={'Detalii participantii'}
                            iconClass={'icon mdi mdi-account-group'}
                        />
                        <label>Sportul si nivelul</label>
                        <SportsSelection
                            sport={this.props.eventDetails.participantsDetails.Sport}
                            level={this.props.eventDetails.participantsDetails.Level}
                            onCloseDrawer={(sport, level) => this.onCloseDrawer(sport, level)}
                        />
                        <label>Numar locuri</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="number"
                            placeholder="Total Locuri"
                            data-lpignore="true"
                            name="TotalParticipants"
                            value={
                                this.props.eventDetails.participantsDetails.TotalParticipants || ''
                            }
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Locuri disponibile</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="number"
                            placeholder="Locuri Disponibile"
                            data-lpignore="true"
                            name="FreeSpots"
                            value={this.props.eventDetails.participantsDetails.FreeSpots || ''}
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Pret participant</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="number"
                            placeholder="Pret Participant"
                            data-lpignore="true"
                            name="PriceForParticipant"
                            value={
                                this.props.eventDetails.participantsDetails.PriceForParticipant ||
                                ''
                            }
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    {this.props.eventDetails.participantsDetails.IsValid && (
                        <Button
                            className="arrow-button align-right"
                            type="link"
                            onClick={() => {
                                this.goToLocationDetails();
                            }}
                        >
                            Inainte
                            <Icon type="right" />
                        </Button>
                    )}
                </div>
            </div>
        );
    }
    goToLocationDetails() {
        history.push('/create-event/location-details');
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
)(ParticipantsDetailsEventPage);
