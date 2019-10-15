import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import history from '../../../utilities/core/history';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../helpers/local-storage.helper';

class IntroMeasurements extends Component<any, any> {
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
  async handleChange(event: any) {
    const registerDetails = JSON.parse(JSON.stringify(this.state.registerDetails));
    const { name, value } = event.target;
    registerDetails.details[name] = value;

    this.setState({
      registerDetails,
    });
  }

  render() {
    return (
      <div className="intro-step-page">
        <div className="page-sections">
          <div className="page-section page-section-large page-section-with-color align-middle">
            <h1 className="invert">Cateva detalii</h1>

            <p className="margin-bottom invert">
              Doua, trei kilograme in plus sau in minus, cui ii pasa. <br />
              Important e ca tu sa te simti bine.
            </p>

            <div className="form">
              <div className="form-group">
                <label>Greutate</label>
                <Input
                  type="number"
                  size="large"
                  addonAfter="kg"
                  placeholder="Greutatea ta in kilograme"
                  name="Weight"
                  value={this.state.registerDetails.details.Weight || ''}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label>Inaltime</label>
                <Input
                  type="number"
                  size="large"
                  addonAfter="cm"
                  placeholder="Inaltime ta in centimetri"
                  name="Height"
                  value={this.state.registerDetails.details.Height || ''}
                  onChange={e => this.handleChange(e)}
                />
              </div>
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
                      !this.state.registerDetails.details.Weight ||
                      this.state.registerDetails.details.Weight < 1 ||
                      !this.state.registerDetails.details.Height ||
                      this.state.registerDetails.details.Height < 1
                    }
                    type="primary"
                    onClick={() => {
                      this.GoForward();
                    }}
                  >
                    Urmatorul pas
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private GoForward() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
    history.push('/intro/step-three');
  }

  private GoBack() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
    history.push('/intro/step-one');
  }
}

export default IntroMeasurements;
