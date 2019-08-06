import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEventDetails } from './../../../../redux/actions/event.action';
import { validate } from 'class-validator';
import { EventDetailsViewModel } from '../../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker, TimePicker, Input, Row, Col, Button, Icon } from 'antd';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
registerSchema(Description);

const format = 'HH:mm';

class DescriptionEventPage extends Component<any, any> {
    async handleChange(event: any) {
        let eventDetails = JSON.parse(JSON.stringify(this.props.eventDetails));
        const { name, value } = event.target;
        name === 'Duration'
            ? (eventDetails.description[name] = parseInt(value, 10))
            : (eventDetails.description[name] = value);
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
                            placeholder={this.props.eventDetails.description.Date || ''}
                            size="large"
                        />
                        <label>Ora Evenimentului</label>
                        <TimePicker
                            format={format}
                            onChange={(time, timeString) => this.onTimeChange(time, timeString)}
                            placeholder={this.props.eventDetails.description.Time || ''}
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
                                value={this.props.eventDetails.description.Duration}
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
                            value={this.props.eventDetails.description.Description || ''}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <Row>
                        <Col span={12}>
                            {this.props.currentSlide !== 0 && (
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
                            )}
                        </Col>
                        <Col span={12} className="text-right">
                            {this.props.eventDetails.description.IsValid && (
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
        history.push('/create-event/location-details');
    }
    goToDetails() {
        history.push('/preview');
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
)(DescriptionEventPage);