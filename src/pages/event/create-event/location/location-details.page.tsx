import React, { Component } from 'react';
import { Input, Button, Icon, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../../redux/actions/event.action';
import { validate } from 'class-validator';
import { registerSchema } from 'class-validator';
import { LocationDetailsSchema } from '../../../../contracts/schemas/location-details.schema';
import { EventDetailsViewModel } from '../../../../contracts/models';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';

registerSchema(LocationDetailsSchema);

class LocationDetailsEventPage extends Component<any, any> {
    public eventDetails = new EventDetailsViewModel();
    async handleChange(event: any) {
        const eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { name, value } = event.target;
        eventDetails.locationDetails[name] = value;
        eventDetails.locationDetails.IsValid = await this.chekIfIsValid(eventDetails);
        this.props.changeEventDetails(eventDetails);
    }

    async chekIfIsValid(model: EventDetailsViewModel) {
        let error = await validate('locationDetailsSchema', model.locationDetails);
        return error.length === 0;
    }

    public render() {
        return (
            <div className="create-event-page event-list-item full-height">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <CreateEventHeaderComponent
                            title={'Detalii locatie'}
                            iconClass={'icon mdi mdi-map-marker-plus'}
                        />
                        <label>Alege Judetul</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="text"
                            placeholder="Judet"
                            data-lpignore="true"
                            name="County"
                            value={this.props.eventDetails.locationDetails.County}
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Alege Orasul</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="text"
                            placeholder="Oras"
                            data-lpignore="true"
                            name="City"
                            value={this.props.eventDetails.locationDetails.City}
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Alege Adresa</label>
                        <Input
                            className="padding-bottom"
                            size="large"
                            type="text"
                            placeholder="Adresa"
                            data-lpignore="true"
                            name="Address"
                            value={this.props.eventDetails.locationDetails.Address}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <Row>
                        <Col span={12}>
                            <Button
                                className="arrow-button"
                                type="link"
                                onClick={() => {
                                    this.goToParticipantsDetails();
                                }}
                            >
                                <Icon type="left" />
                                Inapoi
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            {this.props.eventDetails.locationDetails.IsValid && (
                                <Button
                                    className="arrow-button"
                                    type="link"
                                    onClick={() => {
                                        this.goToDescription();
                                    }}
                                >
                                    Inainte
                                    <Icon type="right" />
                                </Button>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
    goToDescription() {
        history.push('/create-event/description');
    }

    goToParticipantsDetails() {
        history.push('/create-event/participants-details');
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
)(LocationDetailsEventPage);
