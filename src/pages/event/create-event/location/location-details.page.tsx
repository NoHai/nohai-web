import React, { Component } from 'react';
import { Input } from 'antd';
import { registerSchema } from 'class-validator';
import { LocationDetailsSchema } from '../../../../contracts/schemas/location-details.schema';
import { EventDetailsViewModel, LocationEventDetailsModel } from '../../../../contracts/models';
import history from '../../../../utilities/core/history';
import CreateEventHeaderComponent from '../../../../components/create-event-header/create-event-header';
import { LocalStorage } from '../../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../../helpers/local-storage.helper';
import { FormValidators } from '../../../../contracts/validators/forms-validators';
import GoogleLocationAutoComplete from '../../../../components/google-location/google-location-autocomplete';
import HistoryHelper from '../../../../utilities/core/history';
import CreateEventFooter from '../../../../components/create-event-footer/create-event-footer.component';

registerSchema(LocationDetailsSchema);

class LocationDetailsEventPage extends Component<any, any> {
  private isMount: boolean = false;
  private isEditable: boolean = false;

  constructor(props: any) {
    super(props);
    this.isEditable = HistoryHelper.containsPath('/edit-event');
    const eventDetails = this.getEventDetails();

    this.state = {
      eventDetails: eventDetails,
    };

    this.isEventDetailsValid(eventDetails);
  }

  async componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  async handleChange(event: any) {
    const { name, value } = event.target;

    if (this.isMount) {
      this.setState((prevState: any) => ({
        eventDetails: {
          ...prevState.eventDetails,
          locationDetails: {
            ...prevState.eventDetails.locationDetails,
            [name]: value,
          },
        },
      }));

      await this.chekIfIsValid();
    }
  }

  async setLocation(address: LocationEventDetailsModel) {
    if (this.isMount) {
      this.setState((prevState: any) => ({
        eventDetails: {
          ...prevState.eventDetails,
          locationDetails: {
            County: address.County,
            City: address.City,
            StreetName: address.StreetName,
            Longitude: address.Longitude,
            Latitude: address.Latitude,
          },
        },
      }));
      await this.chekIfIsValid();
    }
  }

  async chekIfIsValid() {
    if (this.isMount) {
      const isValid = await FormValidators.checkSchema(
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
  }

  public render() {
    return (
      <div className="event-list-item full-height">
        <div className="item-card full-min-height">
          <div className="margin-bottom">
            <CreateEventHeaderComponent
              title={'Detalii locatie'}
              imagePath="/assets/directions-colour.svg"
            />
            <label>Punct de intalnire</label>
            <GoogleLocationAutoComplete
              streetName={this.state.eventDetails.locationDetails.StreetName}
              isValid={this.state.eventDetails.participantsDetails.IsValid}
              onButtonClick={e => this.setLocation(e)}
            ></GoogleLocationAutoComplete>
            <label>Judet</label>
            <Input
              className="padding-bottom"
              size="large"
              type="text"
              placeholder="Alege Judetul"
              data-lpignore="true"
              name="County"
              value={this.state.eventDetails.locationDetails.County}
              onChange={e => this.handleChange(e)}
            />
            <label>Oras</label>
            <Input
              className="padding-bottom"
              size="large"
              type="text"
              placeholder="Alege Orasul"
              data-lpignore="true"
              name="City"
              value={this.state.eventDetails.locationDetails.City}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <CreateEventFooter
            showLeftButton={true}
            ShowCenterButton={false}
            showRightButton={true}
            onLeftButtonClick={() => this.goToParticipantsDetails()}
            onRightButtonClick={() => this.goToDescription()}
            isValid={this.state.eventDetails.locationDetails.IsValid}
          ></CreateEventFooter>
        </div>
      </div>
    );
  }

  private isEventDetailsValid(eventDetails: any) {
    if (!eventDetails.participantsDetails.IsValid) {
      HistoryHelper.goHome();
    }
  }

  private getEventDetails() {
    const eventDetails = LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      new EventDetailsViewModel()
    );
    if (this.isEditable) {
      eventDetails.locationDetails.IsValid = true;
    }
    return eventDetails;
  }

  goToDescription() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable
      ? history.push('/edit-event/description')
      : history.push('/create-event/description');
  }

  goToParticipantsDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    this.isEditable
      ? history.push('/edit-event/participants-details')
      : history.push('/create-event/participants-details');
  }
}

export default LocationDetailsEventPage;
