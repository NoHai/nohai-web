import { Col, Row } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { UserService } from '../../business/services';
import EventCardOption from '../../components/event-card-option/event-card-option.component';
import SportsSelection from '../../components/sports-selection/sports-selection.component';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import AvatarHelper from '../../helpers/avatar.helper';
import './user-profile.scss';

class UserProfilePage extends Component {
  state = {
    userDetails: new UserViewModel(),
    editContact: true,
    editAbout: true,
  };

  async componentDidMount(): Promise<void> {
    let userDetails: UserViewModel = await UserService.Get();
    this.setState({
      userDetails: userDetails,
    });
  }

  toggleEdit(field: string, value: boolean) {
    this.setState({
      [field]: value,
    });

    if (!this.state.editAbout || !this.state.editContact) {
      this.updateUserDetails();
    }
  }

  async updateUserDetails() {
    const result = await UserService.Update(this.state.userDetails);
    if (result) {
    }
    this.setState({ userDetails: result });
  }

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

  render(): any {
    const age: number | string = moment().diff(
      moment(this.state.userDetails.details.DateOfBirth),
      'years'
    );

    const editIcon = this.state.editAbout
      ? 'edit-pencil mdi mdi-pencil'
      : 'edit-pencil mdi mdi-check-bold';

    const editIconContact = this.state.editContact
      ? 'edit-pencil mdi mdi-pencil'
      : 'edit-pencil mdi mdi-check-bold';

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
              <Row>
                <Col span={20}>
                  <div className="section-header ">Despre</div>
                </Col>
                <Col span={4}>
                  <span
                    className={editIcon}
                    onClick={() => this.toggleEdit('editAbout', !this.state.editAbout)}
                  ></span>
                </Col>
              </Row>
              <div>
                <EventCardOption
                  title={'Data Nasterii'}
                  name="DateOfBirth"
                  iconClass="mdi mdi-calendar-outline"
                  description={`${moment(this.state.userDetails.details.DateOfBirth).format(
                    'DD'
                  )} ${moment(this.state.userDetails.details.DateOfBirth).format('MMMM')} ${moment(
                    this.state.userDetails.details.DateOfBirth
                  ).format('YYYY')}`}
                  isReadOnly={this.state.editAbout}
                  onValueChange={(name, value) => this.valueChange(name, value)}
                />
                <EventCardOption
                  title={'Varsta '}
                  iconClass="mdi mdi-account-multiple"
                  description={`${age} de ani`}
                />
                {this.state.editAbout && (
                  <EventCardOption
                    title={'Pasiuni '}
                    name="Activities"
                    iconClass="mdi mdi-whistle"
                    description={`${this.state.userDetails.details.ActivitiesName}`}
                    isReadOnly={this.state.editAbout}
                    onValueChange={(name, value) => this.valueChange(name, value)}
                  />
                )}
                {!this.state.editAbout && (
                  <SportsSelection
                    multiple={true}
                    acivities={this.state.userDetails.details.ActivitiesId}
                    onClose={(activities) => this.onClose(activities)}
                  ></SportsSelection>
                )}

                <EventCardOption
                  title={'Oraș '}
                  name={'City'}
                  iconClass="mdi mdi-map-marker"
                  description={`${this.state.userDetails.details.City}`}
                  isReadOnly={this.state.editAbout}
                  onValueChange={(name, value) => this.valueChange(name, value)}
                />
                <EventCardOption
                  title={'Descriere '}
                  name="Description"
                  iconClass="mdi mdi-information-outline"
                  description={`${this.state.userDetails.details.Description}`}
                  isReadOnly={this.state.editAbout}
                  onValueChange={(name, value) => this.valueChange(name, value)}
                />
                <EventCardOption
                  title={'Job '}
                  name="JobTitle"
                  iconClass="mdi mdi-briefcase"
                  description={`${this.state.userDetails.details.JobTitle}`}
                  isReadOnly={this.state.editAbout}
                  onValueChange={(name, value) => this.valueChange(name, value)}
                />
              </div>
              <div>
                <Row>
                  <Col span={23}>
                    <div className="section-header">Contact</div>
                  </Col>
                  <Col span={1}>
                    <span
                      className={editIconContact}
                      onClick={() => this.toggleEdit('editContact', !this.state.editContact)}
                    ></span>
                  </Col>
                </Row>
                <div className="email">
                  <EventCardOption
                    title={' '}
                    name="Email"
                    iconClass="mdi mdi-email-outline"
                    description={`${this.state.userDetails.user.Email}`}
                    isReadOnly={this.state.editContact}
                    onValueChange={(name, value) => this.valueChange(name, value)}
                  />
                </div>
                <div className="Pagina de facebook">
                  <EventCardOption
                    title={' '}
                    name="FacebookPage"
                    iconClass="mdi mdi-facebook "
                    description={`${this.state.userDetails.details.FacebookPage}`}
                    isReadOnly={this.state.editContact}
                    onValueChange={(name, value) => this.valueChange(name, value)}
                  />
                </div>
                <div className="Pagina web">
                  <EventCardOption
                    title={' '}
                    name="WebPage"
                    iconClass="mdi mdi-web"
                    description={`${this.state.userDetails.details.WebPage}`}
                    isReadOnly={this.state.editContact}
                    onValueChange={(name, value) => this.valueChange(name, value)}
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
