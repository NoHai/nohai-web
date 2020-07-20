import { Input } from 'antd';
import React, { Component } from 'react';
import CustomDateTimePicker from '../custom-datepicker/custom-datetimepicker.component';
import SportsSelection from '../sports-selection/sports-selection.component';
import { UserDetailsEditProps } from './user-details-edit.props';

class UserDetailsEdit extends Component<UserDetailsEditProps> {
  state = {
    userDetails: this.props.userDetails,
  };

  async handleChange(event: any) {
    this.props.handleChange(event);
  }
  onDateChange(value: any) {
    if (this.props.onDateChange) {
      this.props.onDateChange(value);
    }
  }

  async onClose(activities: Array<string>) {
    this.props.onClose(activities);
  }

  render() {
    return (
      <div>
        <div>
          <CustomDateTimePicker
            value={this.props.userDetails.details.DateOfBirth}
            onValueChange={(e) => this.onDateChange(e)}
            cssClass={'ionic-datepicker full-width'}
          ></CustomDateTimePicker>

          <SportsSelection
            multiple={true}
            acivities={this.props.userDetails.details.ActivitiesId}
            onClose={(activities) => this.onClose(activities)}
          ></SportsSelection>

          <Input
            className="padding-bottom edit"
            size="large"
            type="text"
            placeholder="Oras"
            data-lpignore="true"
            name={'City'}
            value={this.props.userDetails.details.City || ''}
            onChange={(e) => this.handleChange(e)}
          />
          <Input
            className="padding-bottom edit"
            size="large"
            type="text"
            placeholder="Descriere"
            name="Description"
            value={this.props.userDetails.details.Description || ''}
            onChange={(e) => this.handleChange(e)}
          />

          <Input
            className="padding-bottom edit"
            size="large"
            type="text"
            placeholder="Job"
            data-lpignore="true"
            name="JobTitle"
            value={this.props.userDetails.details.JobTitle || ''}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
        <div>
          <div className="section-header">Contact</div>

          <Input
            className="padding-bottom edit"
            size="large"
            type="text"
            placeholder="Pagina de Facebook"
            data-lpignore="true"
            name="FacebookPage"
            value={this.props.userDetails.details.FacebookPage || ''}
            onChange={(e) => this.handleChange(e)}
          />
        </div>
        <Input
          className="padding-bottom edit"
          size="large"
          type="text"
          placeholder="Pagina web"
          data-lpignore="true"
          name="WebPage"
          value={this.props.userDetails.details.WebPage || ''}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default UserDetailsEdit;
