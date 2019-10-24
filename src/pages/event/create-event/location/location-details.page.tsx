import React, { Component } from 'react';
import { Input, Button, Icon, Col, Row } from 'antd';
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

registerSchema(LocationDetailsSchema);

class LocationDetailsEventPage extends Component<any, any> {
  private isMount: boolean = false;

  constructor(props: any) {
    super(props);

    const eventDetails = this.getEventDetails();

    this.state = {
      eventDetails: eventDetails,
    };

    this.isEventDetailsValid(eventDetails);
  }

  componentDidMount() {
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

          <hr />

          <Row>
            <Col span={12}>
              <Button
                className="arrow-button"
                type="link"
                size="large"
                onClick={() => {
                  this.goToParticipantsDetails();
                }}
              >
                <Icon type="left" />
                Inapoi
              </Button>
            </Col>
            <Col span={12} className="text-right">
              <Button
                disabled={!this.state.eventDetails.locationDetails.IsValid}
                type="primary"
                size="large"
                onClick={() => {
                  this.goToDescription();
                }}
              >
                Inainte
                <Icon type="right" />
              </Button>
            </Col>
          </Row>
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
    return LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      new EventDetailsViewModel()
    );
  }

  goToDescription() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    history.push('/create-event/description');
  }

  goToParticipantsDetails() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.CreateEvent, this.state.eventDetails);
    history.push('/create-event/participants-details');
  }
}

export default LocationDetailsEventPage;
