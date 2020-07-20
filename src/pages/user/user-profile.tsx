import { Col, Row } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { UserService } from '../../business/services';
import UserDetailsComponent from '../../components/user-details.component/user-details.component';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import AvatarHelper from '../../helpers/avatar.helper';
import history from '../../utilities/core/history';
import './user-profile.scss';

class UserProfilePage extends Component<any, any> {
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

  navigateEditPage() {
    history.push('/edit-profile');
  }

  async updateUserDetails() {
    const result = await UserService.Update(this.state.userDetails);
    if (result) {
    }
    this.setState({ userDetails: result });
  }

  render(): any {
    const age: number | string = moment().diff(
      moment(this.state.userDetails.details.DateOfBirth),
      'years'
    );

    const editIcon = this.state.editAbout
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
            <div className="email">
              <div>{this.state.userDetails.user.Email}</div>
            </div>

            <div className="user-profile-content">
              <Row>
                <Col span={23}>
                  <div className="section-header ">Despre</div>
                </Col>
                <Col span={1}>
                  <span className={editIcon} onClick={() => this.navigateEditPage()}></span>
                </Col>
              </Row>
              <UserDetailsComponent userDetails={this.state.userDetails}></UserDetailsComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
