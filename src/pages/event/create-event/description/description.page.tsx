import React, { Component } from 'react';
import { EventDetailsViewModel, DescriptionEventModel } from '../../../../contracts/models';
import { registerSchema } from 'class-validator';
import { Description } from './../../../../contracts/schemas/description.schema';
import TextArea from 'antd/lib/input/TextArea';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';
import moment from 'moment';
import 'moment/locale/ro';
import HistoryHelper from '../../../../utilities/core/history';
import CreateEventFooter from '../../../../components/create-event-footer/create-event-footer.component';
import CustomDateTimePickerProps from '../../../../components/custom-datepicker/custom-datetimepicker.component';
import { EventService } from '../../../../business/services';
registerSchema(Description);

const timeFormat = 'HH:mm';

class DescriptionEventPage extends Component<any, any> {
  private isEditable: boolean = false;
  state = {
    eventDetails: new EventDetailsViewModel(),
    errorMessage: '',
    validDates: false,
    validForm: false,
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
            <CustomDateTimePickerProps
              cssClass="ionic-datepicker"
              value={this.state.eventDetails.description.StartDate}
              onValueChange={e => this.onDateTimeChange(e, 'StartDate')}
            ></CustomDateTimePickerProps>

            <CustomDateTimePickerProps
              cssClass="ionic-timepicker"
              value={this.state.eventDetails.description.StartTime}
              dateFormat={timeFormat}
              placeholder="Alege Ora"
              isTimePiker={true}
              onValueChange={e => this.onDateTimeChange(e, 'StartTime')}
            ></CustomDateTimePickerProps>

            <label>Se termina in:</label>
            <CustomDateTimePickerProps
              cssClass="ionic-datepicker"
              value={this.state.eventDetails.description.EndDate}
              onValueChange={e => this.onDateTimeChange(e, 'EndDate')}
            ></CustomDateTimePickerProps>

            <CustomDateTimePickerProps
              cssClass="ionic-timepicker"
              value={this.state.eventDetails.description.EndTime}
              dateFormat={timeFormat}
              placeholder="Alege Ora"
              isTimePiker={true}
              onValueChange={e => this.onDateTimeChange(e, 'EndTime')}
            ></CustomDateTimePickerProps>

            <div>
              {this.state.validDates === false && this.state.validForm === true && (
                <div className="error-text">{this.state.errorMessage}</div>
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
              onChange={e => this.onDescriptionChange(e)}
            />
          </div>

          <CreateEventFooter
            showLeftButton={true}
            ShowCenterButton={false}
            RightButtonIcon={'mdi-calendar-plus'}
            RightButtonText={`${this.isEditable ? 'Salveaza' : 'Adauga'}`}
            showRightButton={true}
            onRightButtonClick={() => this.createEvent()}
            onLeftButtonClick={() => this.goToLocationDetails()}
            isValid={this.state.validForm && this.state.validDates}
          ></CreateEventFooter>
        </div>
      </div>
    );
  }

  private async checkDates(description: DescriptionEventModel) {
    const { startDateTime, endDateTime, defaultStartDate } = this.calculateDate(description);
    if (startDateTime.isSameOrBefore(defaultStartDate)) {
      this.setState({
        errorMessage:
          '*Verifica te rog datele. Evenimentul trebuie sa inceapa cu cel putin o ora dupa momentul in care ne aflam',
      });
      return false;
    } else if (startDateTime.isAfter(endDateTime)) {
      this.setState({
        errorMessage:
          '*Verifica te rog datele. Data de final nu trebuie sa fie inainte de data de inceput',
      });
      return false;
    } else {
      return true;
    }
  }

  private async chekIfIsValid() {
    const isValid = await FormValidators.checkSchema(
      this.state.eventDetails.description,
      'description'
    );

    return isValid;
  }

  private calculateDate(description: DescriptionEventModel) {
    const startDate = moment(description.StartDate).format('YYYY-MM-DD');
    const startTime = moment(description.StartTime).format('HH:mm');
    const startDateTime = moment(startDate + ' ' + startTime, 'YYYY-MM-DD HH:mm');
    const endDate = moment(description.EndDate).format('YYYY-MM-DD');
    const endTime = moment(description.EndTime).format('HH:mm');
    const endDateTime = moment(endDate + ' ' + endTime, 'YYYY-MM-DD HH:mm');
    const defaultStartDate = moment().add(1, 'hour');

    return { startDateTime, endDateTime, defaultStartDate };
  }

  private goToLocationDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable
      ? history.push('/edit-event/location-details')
      : history.push('/create-event/location-details');
  }

  private async createEvent() {
    const result = await EventService.Create(this.state.eventDetails);
    if (result) {
      LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.CreateEvent);
      history.push(`/${this.isEditable ? 'event-edit-info' : 'event-info'}`);
    }
  }

  private async onDescriptionChange(event: any) {
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

  private async onDateTimeChange(event: any, name: string) {
    const description: any = this.state.eventDetails.description;
    description[name] = event;

    const validDates = await this.checkDates(description);
    const isValid = await this.chekIfIsValid();

    this.setState((prevState: any) => ({
      eventDetails: {
        ...prevState.eventDetails,
        description: {
          ...prevState.eventDetails.description,
          [name]: event,
          IsValid: isValid,
        },
      },
      validDates,
      validForm: isValid,
    }));
  }
}

export default DescriptionEventPage;
