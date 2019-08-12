import React, { Component } from 'react';
import { EventDetailsViewModel } from '../../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker, TimePicker, Input, Row, Col, Button, Icon } from 'antd';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';
registerSchema(Description);

const format = 'HH:mm';

class DescriptionEventPage extends Component<any, any> {
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

        let val = name === 'Duration' ? parseInt(value, 10) : value;
        this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                description: {
                    ...prevState.eventDetails.description,
                    [name]: val,
                },
            },
        }));
        await this.chekIfIsValid();
    }

    async onDateChange(date: any, dateString: string) {
        this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                description: {
                    ...prevState.eventDetails.description,
                    Date: dateString,
                },
            },
        }));
        await this.chekIfIsValid();
    }

    async onTimeChange(date: any, timeString: string) {
        this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                description: {
                    ...prevState.eventDetails.description,
                    Time: timeString,
                },
            },
        }));

        await this.chekIfIsValid();
    }

    async chekIfIsValid() {
        let isValid = await FormValidators.checkSchema(
            this.state.eventDetails.description,
            'description'
        );

        this.setState((prevState: any) => ({
            eventDetails: {
                ...prevState.eventDetails,
                description: {
                    ...prevState.eventDetails.description,
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
                            title={'Descrieree eveniment'}
                            iconClass={'icon mdi mdi-clipboard-outline'}
                        />
                        <label>Data Evenimentului</label>
                        <DatePicker
                            onChange={(date, dateString) => this.onDateChange(date, dateString)}
                            placeholder={this.state.eventDetails.description.Date || ''}
                            size="large"
                        />
                        <label>Ora Evenimentului</label>
                        <TimePicker
                            format={format}
                            onChange={(time, timeString) => this.onTimeChange(time, timeString)}
                            placeholder={this.state.eventDetails.description.Time || ''}
                            size="large"
                        />

                        <label>Durata Evenimentului</label>
                        <span className="position-relative">
                            <Input
                                className="padding-bottom"
                                size="large"
                                type="number"
                                placeholder="Durata"
                                data-lpignore="true"
                                name="Duration"
                                value={this.state.eventDetails.description.Duration}
                                onChange={e => this.handleChange(e)}
                            />
                            <span className="constant-palcholder">min</span>
                        </span>
                        <label>Descrierea Evenimentului</label>
                        <TextArea
                            rows={3}
                            data-lpignore="true"
                            name="Description"
                            placeholder="Adauga o descriere a evenimentului"
                            value={this.state.eventDetails.description.Description || ''}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <Row>
                        <Col span={12}>
                            <Button
                                className="arrow-button"
                                type="link"
                                onClick={() => {
                                    this.goToLocationDetails();
                                }}
                            >
                                <Icon type="left" />
                                Inapoi
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            {this.state.eventDetails.description.IsValid && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.goToDetails();
                                    }}
                                >
                                    Vizualizeaza
                                </Button>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    goToLocationDetails() {
        LocalStorageHelper.SaveItemToLocalStorage(
            LocalStorage.CreateEvent,
            this.state.eventDetails
        );
        history.push('/create-event/location-details');
    }
    goToDetails() {
        LocalStorageHelper.SaveItemToLocalStorage(
            LocalStorage.CreateEvent,
            this.state.eventDetails
        );
        history.push('/preview');
    }
}

export default DescriptionEventPage;
