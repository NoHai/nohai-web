import moment from 'moment';
import React, { Component } from 'react';
import { UserService } from '../../business/services';
import UserDetailsEdit from '../../components/user-details-edit.component/user-details-edit.component';
import EditUserProfileFooter from '../../components/user-profile-edit-footer/user-profile-edit-footer.component';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import AvatarHelper from '../../helpers/avatar.helper';
import history from '../../utilities/core/history';
import './edit-user-profile.scss';
import MessageHelper from '../../helpers/message.helper';

class EditUserProfilePage extends Component {
  state = {
    userDetails: new UserViewModel(),
  };

  async componentDidMount(): Promise<void> {
    let userDetails: UserViewModel = await UserService.Get();
    this.setState({
      userDetails: userDetails,
    });
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

  render(): any {
    const age: number | string = moment().diff(
      moment(this.state.userDetails.details.DateOfBirth),
      'years'
    );

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
              <UserDetailsEdit
                userDetails={this.state.userDetails}
                onValueChange={(name, value) => this.valueChange(name, value)}
                onClose={(e) => this.onClose(e)}
                handleChange={(e) => this.handleChange(e)}
              ></UserDetailsEdit>
            </div>
          </div>
        </div>
        <EditUserProfileFooter
          showLeftButton={true}
          ShowCenterButton={false}
          LeftButtonIcon={'mdi-cancel'}
          LeftButtonText={'Anulează'}
          RightButtonText={'Salvează'}
          RightButtonIcon={'mdi-check'}
          showRightButton={true}
          onRightButtonClick={() => this.save()}
          onLeftButtonClick={() => this.cancelEdit()}
          isValid={() => this.isValid()}
        ></EditUserProfileFooter>
      </div>
    );
  }
  async updateUserDetails() {
    const result = await UserService.Update(this.state.userDetails);
    if (result) {
      this.setState({ userDetails: result });
      MessageHelper.showSuccess('Modificarile au fost efectuate cu succes');
    } else {
      MessageHelper.showError('Ooops ceva s-a intamplat!');
    }
  }

  async save() {
    if (this.isValid()) {
      await this.updateUserDetails();
      history.push('/profile');
    }
  }

  cancelEdit() {
    history.push('/profile');
  }

  isValid(): boolean {
    if (this.state.userDetails.details.ActivitiesId.length > 0) {
      return true;
    }
    return false;
  }
}

export default EditUserProfilePage;
