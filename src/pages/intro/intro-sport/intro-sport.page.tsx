import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Row, Col, Button } from 'antd';
import SportsSelection from '../../../components/sports-selection/sports-selection.component';
import { UserService } from '../../../business/services/user.service';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../helpers/local-storage.helper';
import { connect } from 'react-redux';
import { registerComplete } from './../../../redux/actions/auth.action';
import { initialAuthState } from '../../../redux/reducers/auth.reducer';

class IntroSport extends Component<any, any> {
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

  async onClose(activities: Array<string>) {
    this.setState((prevState: any) => ({
      registerDetails: {
        ...prevState.registerDetails,
        details: {
          ...prevState.registerDetails.details,
          ActivitiesId: activities,
        },
      },
    }));
  }

  render() {
    return (
      <div className="intro-step-page">
        <div className="page-sections">
          <div className="page-section page-section-large page-section-with-color align-middle">
            <h1 className="invert">De ce activitate esti pasionat?</h1>

            <p className="invert margin-bottom">
              Alege activitatea de care esti pasionat si nivelul. <br />
              Pe baza activitati selectate iti vom genera timeline-ul
            </p>
            <div className="selection-container">
              <SportsSelection
                multiple={true}
                acivities={this.state.registerDetails.details.ActivitiesId}
                onClose={acivities => this.onClose(acivities)}
              />
            </div>
          </div>

          <div className="page-section page-section-footer">
            <div className="intro-footer">
              <Row>
                <Col span={12}>
                  <Button
                    type="default"
                    onClick={() => {
                      this.GoBack();
                    }}
                  >
                    Pasul anterior
                  </Button>
                </Col>
                <Col span={12} className="text-right">
                  <Button
                    disabled={
                      this.state.registerDetails.details.ActivitiesId &&
                      this.state.registerDetails.details.ActivitiesId.length <= 0
                    }
                    type="primary"
                    onClick={() => {
                      this.GoForward();
                    }}
                  >
                    Finish
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async GoForward() {
    const result = await UserService.Update(this.state.registerDetails);
    if (result.user.Id) {
      this.props.registerComplete();
      LocalStorageHelper.DeleteItemFromLocalStorage(LocalStorage.IntroInfo);
      history.push('/step-four');
    }
  }

  private GoBack() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
    history.push('/intro/step-one');
  }
}

const mapStateToProps = (state: any) => {
  if (state.authReducer && state.authReducer.isAuthorized) {
    return {
      isLoaded: state.authReducer.isLoaded,
      isAuthorized: state.authReducer.isAuthorized,
    };
  }

  return initialAuthState;
};

const mapDispatchToProps = {
  registerComplete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroSport);
