import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action';
import { validate } from 'class-validator';
import { EventDetailsViewModel } from '../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
registerSchema(Description);

class DescriptionEventComponent extends Component<any, any> {
    async handleChange(event: any) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { value } = event.target;
        eventDetails.description.Description = value;
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
