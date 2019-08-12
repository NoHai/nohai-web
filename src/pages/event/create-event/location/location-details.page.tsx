import React, { Component } from 'react';
import { Input, Button, Icon, Col, Row } from 'antd';
import { registerSchema } from 'class-validator';
import { LocationDetailsSchema } from '../../../../contracts/schemas/location-details.schema';
import { EventDetailsViewModel } from '../../../../contracts/models';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';

registerSchema(LocationDetailsSchema);

class LocationDetailsEventPage extends Component<any, any> {
    state = {
        eventDetails: new EventDetailsViewModel(),
    };

    componentDidMount() {
        this.setState({
            eventDetails: LocalStorageHelper.GetItemFromLocalStorage(
                LocalStorage.CreateEvent,
                this.state.eventDetails
            ),
        });
    }
    async handleChange(event: any) {
        const { name, value } = event.target;

        await this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                locationDetails: {
                    ...prevState.eventDetails.locationDetails,
                    [name]: value,
                },
            },
        }));
        await this.chekIfIsValid()
    }

    async chekIfIsValid() {
        let isValid = await FormValidators.checkSchema(
            this.state.eventDetails.locationDetails,
            'locationDetailsSchema'
        );

        this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                locationDetails: {
                    ...prevState.eventDetails.locationDetails,
                    IsValid: isValid,
                },
            },
        }));
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
                            readOnly
                            className="padding-bottom"
                            size="large"
                            type="text"
                            placeholder="Judet"
                            data-lpignore="true"
                            name="County"
                            value={this.state.eventDetails.locationDetails.County}
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
                            value={this.state.eventDetails.locationDetails.City}
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
                            value={this.state.eventDetails.locationDetails.Address}
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
                            {this.state.eventDetails.locationDetails.IsValid && (
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
        LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent,this.state.eventDetails)
        history.push('/create-event/description');
    }

    goToParticipantsDetails() {
        LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent,this.state.eventDetails)
        history.push('/create-event/participants-details');
    }
}

export default LocationDetailsEventPage;
