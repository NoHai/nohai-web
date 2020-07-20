import moment from 'moment';
import React, { Component } from 'react';
import EventCardOption from '../event-card-option/event-card-option.component';
import { UserDetailsProps } from './user-details-props';
import './user-details.component.scss';

class UserDetailsComponent extends Component<UserDetailsProps> {
  async onClose(activities: Array<string>) {
    this.setState((prevState: any) => ({
      userDetails: {
        ...prevState.userDetails,
        details: {
          ...prevState.userDetails.details,
          ActivitiesId: activities,
        },
      },
    }));
  }

  valueChange(name: string, value: any) {
    this.setState((prevState: any) => ({
      userDetails: {
        ...prevState.userDetails,
        details: {
          ...prevState.userDetails.details,
          [name]: value,
        },
      },
    }));
  }

  onDateChange(value: any) {
    this.setState((prevState: any) => ({
      userDetails: {
        ...prevState.userDetails,
        details: {
          ...prevState.userDetails.details,
          DateOfBirth: value,
        },
      },
    }));
  }

  async handleChange(event: any) {
    const { name, value } = event.target;
    this.setState((prevState: any) => ({
      userDetails: {
        ...prevState.userDetails,
        details: {
          ...prevState.userDetails.details,
          [name]: value,
        },
      },
    }));
  }

  render() {
    const age: number | string = moment().diff(
      moment(this.props.userDetails.details.DateOfBirth),
      'years'
    );
    return (
      <div>
        <div>
          <EventCardOption
            title={'Data Nasterii'}
            name="DateOfBirth"
            iconClass="mdi mdi-calendar-outline"
            description={`${moment(this.props.userDetails.details.DateOfBirth).format(
              'DD'
            )} ${moment(this.props.userDetails.details.DateOfBirth).format('MMMM')} ${moment(
              this.props.userDetails.details.DateOfBirth
            ).format('YYYY')}`}
            onValueChange={(name, value) => this.valueChange(name, value)}
          />

          <EventCardOption
            title={'Varsta '}
            iconClass="mdi mdi-account-multiple"
            description={`${age} de ani`}
          />

          <EventCardOption
            title={'Pasiuni '}
            name="Activities"
            iconClass="mdi mdi-whistle"
            description={`${this.props.userDetails.details.ActivitiesName}`}
            onValueChange={(name, value) => this.valueChange(name, value)}
          />

          <EventCardOption
            title={'Oraș '}
            name={'City'}
            iconClass="mdi mdi-map-marker"
            description={`${this.props.userDetails.details.City}`}
            onValueChange={(name, value) => this.valueChange(name, value)}
          />

          <EventCardOption
            title={'Descriere '}
            name="Description"
            iconClass="mdi mdi-information-outline"
            description={`${this.props.userDetails.details.Description}`}
            onValueChange={(name, value) => this.valueChange(name, value)}
          />

          <EventCardOption
            title={'Job '}
            name="JobTitle"
            iconClass="mdi mdi-briefcase"
            description={`${this.props.userDetails.details.JobTitle}`}
            onValueChange={(name, value) => this.valueChange(name, value)}
          />
        </div>

        <div></div>
        <div>
          <div className="section-header">Contact</div>
          <div className="Pagina de facebook">
            <EventCardOption
              title={' '}
              name="FacebookPage"
              iconClass="mdi mdi-facebook "
              description={`${this.props.userDetails.details.FacebookPage}`}
              onValueChange={(name, value) => this.valueChange(name, value)}
            />
          </div>
          <div className="Pagina web">
            <EventCardOption
              title={' '}
              name="WebPage"
              iconClass="mdi mdi-web"
              description={`${this.props.userDetails.details.WebPage}`}
              onValueChange={(name, value) => this.valueChange(name, value)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetailsComponent;
