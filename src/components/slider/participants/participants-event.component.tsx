import React, { Component } from 'react';
import { Input } from 'antd';
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
            <div>
                <label>Sportul si nivelul</label>
                <SportsSelection />
                <label>Numar locuri</label>
                <Input className="padding-bottom"
                    size="large"
                    type="number"
                    placeholder="Total Locuri"
                    data-lpignore="true"
                    name="TotalParticipants"
                    value={this.props.eventDetails.participantsDetails.TotalParticipants}
                    onChange={e => this.handleChange(e)}
                />
                <label>Locuri disponibile</label>
                <Input className="padding-bottom"
                    size="large"
                    type="number"
                    placeholder="Locuri Disponibile"
                    data-lpignore="true"
                    name="FreeSpots"
                    value={this.props.eventDetails.participantsDetails.FreeSpots}
                    onChange={e => this.handleChange(e)}
                />
                <label>Pret participant</label>
                <Input className="padding-bottom"
                    size="large"
                    type="number"
                    placeholder="Pret Participant"
                    data-lpignore="true"
                    name="PriceForParticipant"
                    value={this.props.eventDetails.participantsDetails.PriceForParticipant}
                    onChange={e => this.handleChange(e)}
                />
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
