import React, { Component } from 'react';
import { Input } from 'antd';
import { GoogleLocationAutoCompleteProps } from './google-location-autocomplete.prop';
import LocalStorageHelper from '../../helpers/local-storage.helper';
import { LocalStorage } from '../../contracts/enums/localStorage/local-storage';
import { EventDetailsViewModel, LocationEventDetailsModel } from '../../contracts/models';

class GoogleLocationAutoComplete extends Component<GoogleLocationAutoCompleteProps> {
  private isMount: boolean = false;

  state = { streetName: '' };
  eventDetail = new EventDetailsViewModel();
  public autocomplete: any;
  constructor(props: any) {
    super(props);
    this.initLocationSearch = this.initLocationSearch.bind(this);
  }

  async componentDidMount() {
    this.isMount = true;
    this.eventDetail = await LocalStorageHelper.GetItemFromLocalStorage(
      LocalStorage.CreateEvent,
      this.eventDetail
    );

    if (this.props.isValid) {
      this.setState({
        streetName: this.eventDetail.locationDetails.StreetName,
      });

      this.initLocationSearch();
    }
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  async handleAddressChange(event: any) {
    const { value } = event.target;
    this.setState({
      streetName: value,
    });
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          id={'address'}
          size="large"
          className="form-control"
          placeholder={'Adresa'}
          value={this.state.streetName}
          onChange={e => this.handleAddressChange(e)}
          onBlur={e=>this.sendAddress()}
        />
      </div>
    );
  }

  private initLocationSearch() {
    var input = document.querySelector('#address');
    const google = (window as any).google;
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(45.49552, 23.703),
      new google.maps.LatLng(46.25466, 24.78516)
    );

    var options = {
      bounds: defaultBounds,
      zoom: 9,
      strictBounds: true,
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.initAutocomplete(this.autocomplete);
  }

  private async initAutocomplete(autocomplete: any) {
    this.autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const address = this.getAddress(place);
      if (this.props.onButtonClick) {
        this.props.onButtonClick(address);
      }

      if (this.isMount) {
        this.setState({
          streetName: address.StreetName,
        });
      }
    });
  }

  private sendAddress(){
    const address: LocationEventDetailsModel = {
      City: '',
      County: '',
      StreetName: this.state.streetName,
      IsValid: false,
    };
    if (this.props.onButtonClick) {
      this.props.onButtonClick(address);
    }
  }

  private getAddress(place: any) {
    if (place.adr_address) {
      const city = this.getAddressValue(place, 'locality');
      const county = this.getAddressValue(place, 'administrative_area_level_1');
      const latitude = this.getLatitude(place);
      const longitude = this.getLongitude(place);
      const streetName = place.name;

      const address: LocationEventDetailsModel = {
        City: city,
        County: county.substr(county.indexOf(' ') + 1),
        Latitude: latitude,
        Longitude: longitude,
        StreetName: streetName,
        IsValid: false,
      };
      return address;
    } else {
      return this.createEmptyLocation(place);
    }
  }

  private createEmptyLocation(place: any) {
    const address: LocationEventDetailsModel = {
      City: '',
      County: '',
      StreetName: place.name,
      IsValid: false,
    };
    return address;
  }

  private getLatitude(place: any) {
    return place.geometry.location.lat();
  }

  private getLongitude(place: any) {
    return place.geometry.location.lng();
  }

  private getAddressValue(place: any, addressType: string, propertyKey: string = 'long_name') {
    const element = this.getAddressComponent(place, addressType);
    return element ? element[propertyKey] : null;
  }

  private getAddressComponent(place: any, addressType: string) {
    return place.address_components.find((address: any) =>
      address.types.some((t: any) => t === addressType)
    );
  }
}

export default GoogleLocationAutoComplete;
