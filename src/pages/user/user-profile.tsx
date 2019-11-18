import React, { Component } from 'react';
import './user-profile.scss';
import { UserService } from '../../business/services';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import moment from 'moment';
import AvatarHelper from '../../helpers/avatar.helper';
import EventCardOption from '../../components/event-card-option/event-card-option.component';

class UserProfilePage extends Component {
  state = {
    userDetails: new UserViewModel(),
  };

  async componentDidMount(): Promise<void> {
    let userDetails: UserViewModel = await UserService.Get();
    this.setState({
      userDetails: userDetails,
    });
  }

  render(): any {
    const age: number | string =
      moment().diff(moment(this.state.userDetails.details.Day, 'DD/MM/YYYY'), 'years') || '';

    return (
      <div className="user-profile event-list-item full-height">
        <div className="page-sections item-card ">
          <div className="page-section page-section-large">
            <div className="text-align">
              <div
                className="dot avatar"
                style={{
                  backgroundImage: `url(${AvatarHelper.get(this.state.userDetails.user.Url, 150)})`,
                }}
              ></div>
            </div>

            <div className="name">
              {this.state.userDetails.user.FirstName || ''}{' '}
              {this.state.userDetails.user.LastName || ''}
            </div>

            <div className="user-profile-content">
                <div className="section-header">Despre</div>
                <div className="body-sections">
                  <EventCardOption
                    title={'Data Nasterii'}
                    iconClass="mdi mdi-calendar-outline"
                    description={`${moment(
                      this.state.userDetails.details.Day,
                      'DD/MM/YYYY'
                    ).day()} ${moment(this.state.userDetails.details.Day, 'DD/MM/YYYY').format(
                      'MMMM'
                    )} ${moment(this.state.userDetails.details.Day, 'DD/MM/YYYY').format('YYYY')}`}
                  />
                  <EventCardOption
                    title={'Varsta '}
                    iconClass="mdi mdi-account-multiple"
                    description={`${age} de ani`}
                  />
                  <EventCardOption
                    title={'Pasiuni '}
                    iconClass="mdi mdi-whistle"
                    description={`${this.state.userDetails.sport.Name}`}
                  />
                </div>
              <div>
                <div className="section-header">Contact</div>
                <div className="body-sections email">
                  <EventCardOption
                    title={' '}
                    iconClass="mdi mdi-email-outline"
                    description={`${this.state.userDetails.user.Email}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
