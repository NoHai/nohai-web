import React, { Component } from 'react';
import './user-profile.scss';
import { Input, Row, Col } from 'antd';
import { UserService } from '../../business/services';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import moment from 'moment';
import AvatarHelper from '../../helpers/avatar.helper';

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
      <div className="user-profile full-height">
        <div className="page-sections">
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
              <div className="margin-bottom">
                <div className="div-sections inline">Despre</div>
                <span className="icon mdi mdi-alpha-i-circle-outline bold"></span>
                <div>
                  Nascut in {moment(this.state.userDetails.details.Day, 'DD/MM/YYYY').day()}{' '}
                  {moment(this.state.userDetails.details.Day, 'DD/MM/YYYY').format('MMMM')}{' '}
                  {moment(this.state.userDetails.details.Day, 'DD/MM/YYYY').format('YYYY')}, {age}{' '}
                  de ani. 
                  Pasionat de {this.state.userDetails.sport.Name}
                </div>
              </div>

              <div>
                <div className="div-sections">Contact</div>
                <span className="icon mdi mdi-email-outline inline">
                  <label>{this.state.userDetails.user.Email}</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
