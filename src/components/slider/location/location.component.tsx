import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../redux/actions/event.action';
import { EventDetailsViewModel } from '../../../contracts/models';
import { validate } from 'class-validator';
import { registerSchema } from 'class-validator';
import { LocationDetailsSchema } from './../../../contracts/schemas/location-details.schema';
registerSchema(LocationDetailsSchema);

class LocationComponent extends Component<any, any> {
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
            <div>
                <div className="slide-title">
                    Detalii locatie
                    <div className="mdi mdi-map-marker-plus" />
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Judetul:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Judet"
                                data-lpignore="true"
                                name="County"
                                value={this.props.eventDetails.locationDetails.County}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Orasul:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Oras"
                                data-lpignore="true"
                                name="City"
                                value={this.props.eventDetails.locationDetails.City}
                                onChange={e => this.handleChange(e)}
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col span={12}>
                            <span>Alege Adresa:</span>
                        </Col>
                        <Col span={12}>
                            <input
                                type="text"
                                placeholder="Adresa"
                                data-lpignore="true"
                                name="Address"
                                value={this.props.eventDetails.locationDetails.Address}
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
)(LocationComponent);
