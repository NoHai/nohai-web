import React, { Component } from 'react';
import { EventDetailsViewModel, DescriptionEventModel } from '../../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker, TimePicker, Row, Col, Button, Icon } from 'antd';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';
import moment from 'moment';
import 'moment/locale/ro';
import DateHelper from '../../../../helpers/date.helper';
import HistoryHelper from '../../../../utilities/core/history';
registerSchema(Description);

const timeFormat = 'HH:mm';
const dateFormat = 'YYYY:MM:DD';

class DescriptionEventPage extends Component<any, any> {
  state = {
    eventDetails: new EventDetailsViewModel(),
    validEndDate: false,
    finishForm: false,
    openStartTime: false,
    openEndTime: false,
  };

  async componentDidMount() {
    let eventDetails = LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      this.state.eventDetails
    );
    const validEndDate = await this.checkDates(eventDetails.description);
    this.setState({
      eventDetails: eventDetails,
      finishForm: eventDetails.description.IsValid && validEndDate,
    });
    if (!eventDetails.locationDetails.IsValid) {
      HistoryHelper.goHome();
    }
  }

  handleClose(name: any) {
    this.setState({
      [name]: false,
    });
  }

  handleOpenChange(name: any) {
    this.setState({
      [name]: true,
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
  }

  async onDateTimeChange(date: any, DateTimeString: string, name: string) {
    const description: any = this.state.eventDetails.description;
    description[name] = DateTimeString;

    const validEndDate = await this.checkDates(description);
    const isValid = await this.chekIfIsValid();

    this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        description: {
          ...prevState.eventDetails.description,
          [name]: DateTimeString,
          IsValid: isValid,
        },
      },
      validEndDate,
      finishForm: isValid && validEndDate,
    }));
  }

  async chekIfIsValid() {
    const isValid = await FormValidators.checkSchema(
      this.state.eventDetails.description,
      'description'
    );

    return isValid;
  }

  public render() {
    return (
      <div className="create-event-page event-list-item full-height">
        <div className="page-sections">
          <div className="page-section page-section-large">
            <CreateEventHeaderComponent
              title={'Detalii eveniment'}
              iconClass={'icon mdi mdi-clipboard-outline'}
            />
            <label>Incepe in:</label>
            <DatePicker
              onChange={(date, dateString) => this.onDateTimeChange(date, dateString, 'StartDate')}
              placeholder={'Data'}
              size="large"
              value={
                DateHelper.GetDateFromString(this.state.eventDetails.description.StartDate) ||
                undefined
              }
            />

            <TimePicker
              inputReadOnly
              open={this.state.openStartTime}
              onOpenChange={e => this.handleOpenChange('openStartTime')}
              size="large"
              addon={() => (
                <Button
                  size="small"
                  type="primary"
                  onClick={e => this.handleClose('openStartTime')}
                >
                  Ok
                </Button>
              )}
              defaultOpenValue={moment('00:00', timeFormat)}
              format={timeFormat}
              onChange={(time, timeString) => this.onDateTimeChange(time, timeString, 'StartTime')}
              placeholder={'Ora'}
              value={
                DateHelper.GetDateFromString(
                  this.state.eventDetails.description.StartTime,
                  timeFormat
                ) || undefined
              }
            />
            <label>Se termina in:</label>
            <DatePicker
              onChange={(date, dateString) => this.onDateTimeChange(date, dateString, 'EndDate')}
              placeholder={'Data'}
              size="large"
              value={
                DateHelper.GetDateFromString(this.state.eventDetails.description.EndDate) ||
                undefined
              }
            />

            <TimePicker
              inputReadOnly
              open={this.state.openEndTime}
              onOpenChange={e => this.handleOpenChange('openEndTime')}
              defaultOpenValue={moment('00:00', timeFormat)}
              format={timeFormat}
              size="large"
              addon={() => (
                <Button size="small" type="primary" onClick={e => this.handleClose('openEndTime')}>
                  Ok
                </Button>
              )}
              onChange={(time, timeString) => this.onDateTimeChange(time, timeString, 'EndTime')}
              placeholder={'Ora'}
              value={
                DateHelper.GetDateFromString(
                  this.state.eventDetails.description.EndTime,
                  timeFormat
                ) || undefined
              }
            />
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
              <Button
                disabled={!this.state.finishForm}
                type="primary"
                onClick={() => {
                  this.goToDetails();
                }}
              >
                Vizualizeaza
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  async checkDates(description: DescriptionEventModel) {
    return moment(description.StartDate, dateFormat).isSame(moment(description.EndDate, dateFormat))
      ? moment(description.StartTime, timeFormat) < moment(description.EndTime, timeFormat)
      : moment(description.StartDate, dateFormat).isBefore(moment(description.EndDate, dateFormat));
  }

  goToLocationDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    history.push('/create-event/location-details');
  }
  async goToDetails() {
    await this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        event: {
          ...prevState.eventDetails.event,
          Name: `${this.state.eventDetails.sport.Name}, ${moment(
            this.state.eventDetails.description.StartDate
          )
            .locale('ro')
            .format('dddd')}  ${moment(this.state.eventDetails.description.StartDate).format(
            'DD'
          )} ${moment(this.state.eventDetails.description.StartDate).format('MMMM')} ora ${
            this.state.eventDetails.description.StartTime
          }`,
        },
      },
    }));
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    history.push('/create-event/preview');
  }
}

export default DescriptionEventPage;
