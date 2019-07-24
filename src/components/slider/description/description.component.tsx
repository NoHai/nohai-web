import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action';
import { validate } from 'class-validator';
import { EventDetailsViewModel } from '../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker, TimePicker } from 'antd';
registerSchema(Description);

const format = 'HH:mm';

class DescriptionEventComponent extends Component<any, any> {
    async handleChange(event: any) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { value } = event.target;
        eventDetails.description.Description = value;
        eventDetails.description.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async onDateChange(date: any, dateString: string) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        eventDetails.description.Date = dateString;
        eventDetails.description.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async onTimeChange(date: any, timeString: string) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        eventDetails.description.Time = timeString;
        eventDetails.description.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async chekIfIsValid(model: EventDetailsViewModel) {
        let error = await validate('description', model.description);
        return error.length === 0;
    }
    public render() {
        return (
            <div>
                <div className="full-width">
                    <DatePicker
                        onChange={(date, dateString) => this.onDateChange(date, dateString)}
                        placeholder={this.props.eventDetails.description.Date}
                    />
                    <TimePicker
                        format={format}
                        onChange={(time, timeString) => this.onTimeChange(time, timeString)}
                        placeholder={this.props.eventDetails.description.Time}
                    />
                </div>
                <TextArea
                    rows={5}
                    data-lpignore="true"
                    placeholder="Adauga o descriere a evenimentului"
                    value={this.props.eventDetails.description.Description}
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
)(DescriptionEventComponent);
