import React, { Component } from 'react';
import { Button, Input } from 'antd';
import history from '../../../utilities/core/history';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import LocalStorageHelper from '../../../helpers/local-storage.helper';
import CustomDateTimePicker from '../../../components/custom-datepicker/custom-datetimepicker.component';

class IntroPersonPage extends Component<any, any> {
  state = {
    registerDetails: new UserViewModel(),
  };
  componentDidMount() {
    this.setState({
      registerDetails: LocalStorageHelper.GetItemFromLocalStorage(
        LocalStorage.IntroInfo,
        this.state.registerDetails
      ),
    });
  }

  render() {
    return (
      <div className="intro-step-page">
        <div className="page-sections">
          <div className="page-section page-section-large page-section-with-color align-middle">
            <h1 className="invert">Sa ne cunoastem</h1>

            <p className="margin-bottom invert">
              Ma bucur ca ai ales sa folosesti aplicatia NoHai. <br />
              Ca se ne cunoastem mai bine as vrea sa stiu cum te numeste si ce varsta ai
            </p>

            <div className="form">
              <div className="form-group">
                <label>Prenume</label>
                <Input
                  size="large"
                  placeholder="Prenumele tau"
                  name="FirstName"
                  value={this.state.registerDetails.user.FirstName || ''}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label>Nume</label>
                <Input
                  size="large"
                  placeholder="Numele tau"
                  name="LastName"
                  value={this.state.registerDetails.user.LastName || ''}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              {this.getDateForm()}
            </div>
          </div>

          <div className="page-section page-section-footer">
            <div className="intro-footer text-right">
              <Button
                disabled={!this.checkForm()}
                type="primary"
                onClick={() => {
                  this.goForward();
                }}
              >
                Urmatorul pas
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getDateForm() {
    return (
      <div className="form-group">
        <label>Data nasterii</label>
        <CustomDateTimePicker
          value={this.state.registerDetails.details.DateOfBirth}
          onValueChange={e => this.onDateChange(e)}
          cssClass={'ionic-datepicker full-width'}
        ></CustomDateTimePicker>
      </div>
    );
  }

  checkForm(): boolean {
    if (
      this.state.registerDetails.user.FirstName &&
      this.state.registerDetails.user.LastName &&
      this.state.registerDetails.details.DateOfBirth
    ) {
      return true;
    }

    return false;
  }

  handleChange(event: any) {
    const { name, value } = event.target;

    this.setState((prevState: any) => ({
      registerDetails: {
        ...prevState.registerDetails,
        user: {
          ...prevState.registerDetails.user,
          [name]: value,
        },
      },
    }));
  }

  onDateChange(value: any) {
    this.setState((prevState: any) => ({
      registerDetails: {
        ...prevState.registerDetails,
        details: {
          ...prevState.registerDetails.details,
          DateOfBirth: value,
        },
      },
    }));
  }

  private goForward() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
    history.push('/intro/step-two');
  }
}

export default IntroPersonPage;
