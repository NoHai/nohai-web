import React, { Component } from 'react';
import { EventDetailsViewModel, DescriptionEventModel } from '../../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker, TimePicker, Button } from 'antd';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';
import moment from 'moment';
import 'moment/locale/ro';
import DateHelper from '../../../../helpers/date.helper';
import HistoryHelper from '../../../../utilities/core/history';
import CreateEventFooter from '../../../../components/create-event-footer/create-event-footer.component';
registerSchema(Description);

const timeFormat = 'HH:mm';
const dateFormat = 'YYYY-MM-DD';

class DescriptionEventPage extends Component<any, any> {
  private isEditable: boolean = false;
  state = {
    eventDetails: new EventDetailsViewModel(),
    validDates: false,
    validForm: false,
    openStartTime: false,
    openEndTime: false,
  };

  async componentDidMount() {
    this.isEditable = HistoryHelper.containsPath('/edit-event');
    const eventDetails = LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      this.state.eventDetails
    );
    if (this.isEditable) {
      eventDetails.description.IsValid = true;
    }

    if (!eventDetails.description.StartDate) {
      eventDetails.description.StartDate = moment().format(dateFormat);
      eventDetails.description.EndDate = moment().format(dateFormat);
      eventDetails.description.StartTime = moment()
        .add(1, 'hours')
        .endOf('hour')
        .format(timeFormat);
      eventDetails.description.EndTime = moment()
        .add(3, 'hours')
        .endOf('hour')
        .format(timeFormat);
      eventDetails.description.IsValid = true;
    }

    const validDates = await this.checkDates(eventDetails.description);
    this.setState({
      eventDetails,
      validForm: eventDetails.description.IsValid,
      validDates,
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

    const val = name === 'Duration' ? parseInt(value, 10) : value;
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

    const validDates = await this.checkDates(description);
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
      validDates,
      validForm: isValid,
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
      <div className="event-list-item full-height">
        <div className="item-card full-min-height">
          <div className="margin-bottom">
            <CreateEventHeaderComponent
              title={'Detalii eveniment'}
              imagePath="/assets/travel-tickets-colour.svg"
            />
            <label>Incepe in:</label>
            <DatePicker
              onChange={(date, dateString) => this.onDateTimeChange(date, dateString, 'StartDate')}
              placeholder={'Data'}
              disabledDate={e => this.disabledDate(e, 'startDate')}
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
              defaultOpenValue={moment('12:00', timeFormat)}
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
              disabledDate={e => this.disabledDate(e, 'endDate')}
              value={
                DateHelper.GetDateFromString(this.state.eventDetails.description.EndDate) ||
                undefined
              }
            />

            <TimePicker
              inputReadOnly
              open={this.state.openEndTime}
              onOpenChange={e => this.handleOpenChange('openEndTime')}
              defaultOpenValue={moment('12:00', timeFormat)}
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
            <div>
              {this.state.validDates === false && this.state.validForm === true && (
                <div className="error-text">
                  *Verifica datele evenimentului. Ora inceperii activitatii trebuie sa fie cu cel
                  putin 30 de minute dupa ora curenta.
                </div>
              )}
            </div>
            <label className="inline-input-label">Descrierea Evenimentului</label>
            <span className="optional-span">(Optional)</span>
            <TextArea
              rows={3}
              data-lpignore="true"
              name="Description"
              placeholder="Adauga o descriere a evenimentului"
              value={this.state.eventDetails.description.Description || ''}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <CreateEventFooter
            showLeftButton={true}
            ShowCenterButton={false}
            RightButtonIcon={'mdi-calendar-check'}
            RightButtonText={'Vizualizeaza'}
            showRightButton={true}
            onRightButtonClick={() => this.goToDetails()}
            onLeftButtonClick={() => this.goToLocationDetails()}
            isValid={this.state.validForm && this.state.validDates}
          ></CreateEventFooter>
        </div>
      </div>
    );
  }

  async checkDates(description: DescriptionEventModel) {
    const { startDate, endDate, nowDate, startTime, nowTime, endTime } = this.calculateDate(
      description
    );
    const happensInSameDay = startDate.isSame(endDate);
    const happensToday = startDate.isSame(nowDate);
    let isValid = false;
    if (happensToday) {
      isValid = happensInSameDay
        ? startTime.isSameOrAfter(nowTime, 'minutes') && startTime.isBefore(endTime)
        : startTime.isSameOrAfter(nowTime, 'minutes');
    } else {
      isValid = happensInSameDay ? startTime.isBefore(endTime) : startDate.isBefore(endDate);
    }
    return isValid;
  }

  disabledDate(current: any, type: string) {
    return type === 'startDate'
      ? current < moment().subtract(1, 'days')
      : current < moment(this.state.eventDetails.description.StartDate);
  }

  goToLocationDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable
      ? history.push('/edit-event/location-details')
      : history.push('/create-event/location-details');
  }

  goToDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable ? history.push('/edit-event/preview') : history.push('/create-event/preview');
  }

  private calculateDate(description: DescriptionEventModel) {
    const startDate = this.isEditable
      ? moment(description.StartDate)
      : moment(description.StartDate, dateFormat);
    const endDate = this.isEditable
      ? moment(description.EndDate)
      : moment(description.EndDate, dateFormat);
    const startTime = moment(description.StartTime, timeFormat);
    const endTime = moment(description.EndTime, timeFormat);
    const today = moment().format(dateFormat);
    const now = moment()
      .add(30, 'minutes')
      .format(timeFormat);
    const nowDate = moment(today, dateFormat);
    const nowTime = moment(now, timeFormat);

    return { startDate, endDate, nowDate, startTime, nowTime, endTime };
  }
}

export default DescriptionEventPage;
