import React, { Component } from 'react';
import { Button, Input, Row, Col, Select } from 'antd';
import history from '../../../utilities/core/history';
import DateHelper from '../../../helpers/date.helper';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import LocalStorageHelper from '../../../helpers/local-storage.helper';
import moment from 'moment';

class IntroPersonPage extends Component<any, any> {
  state = {
    registerDetails: new UserViewModel(),
    days: [],
    months: [],
    years: [],
  };
  componentDidMount() {
    this.setState({
      registerDetails: LocalStorageHelper.GetItemFromLocalStorage(
        LocalStorage.IntroInfo,
        this.state.registerDetails
      ),
    });
    this.populateYears();
    this.populateMonths();
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

        <Row gutter={16}>
          <Col span={7}>
            <Select
              placeholder="An"
              size="large"
              style={{ width: '100%' }}
              value={this.state.registerDetails.details.Year}
              onChange={(value: any) => this.handleDateChange(value, 'Year')}
            >
              {this.state.years}
            </Select>
          </Col>

          <Col span={10}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={this.state.registerDetails.details.Month}
              onChange={(value: any) => this.handleDateChange(value, 'Month')}
              placeholder="Luna"
            >
              {this.state.months}
            </Select>
          </Col>

          <Col span={7}>
            <Select
              placeholder="Zi"
              disabled={
                this.state.registerDetails.details.Month === undefined ||
                this.state.registerDetails.details.Year === undefined
              }
              size="large"
              style={{ width: '100%' }}
              value={this.state.registerDetails.details.Day}
              onChange={(value: any) => this.handleDateChange(value, 'Day')}
            >
              {this.state.days}
            </Select>
          </Col>
        </Row>
      </div>
    );
  }

  checkForm(): boolean {
    if (
      this.state.registerDetails.user.FirstName &&
      this.state.registerDetails.user.LastName &&
      this.state.registerDetails.details.Day &&
      this.state.registerDetails.details.Month &&
      this.state.registerDetails.details.Year
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

  handleDateChange(value: any, type: string) {
    this.setState((prevState: any) => ({
      registerDetails: {
        ...prevState.registerDetails,
        details: {
          ...prevState.registerDetails.details,
          [type]: value,
        },
      },
    }));

    if (type !== 'Day') {
      const selectedDate =
        type === 'Month'
          ? this.state.registerDetails.details.Year + '-' + value
          : value + '-' + this.state.registerDetails.details.Month;
      this.populateDays(selectedDate);
    }
  }

  private goForward() {
    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
    history.push('/intro/step-two');
  }

  private populateDays(selectedDate: string) {
    const startDay = 1;
    const endDay = moment(selectedDate, 'YYYY-MM').daysInMonth();

    this.populateDate(startDay, endDay, 'days');
  }

  private populateMonths() {
    const Option = Select.Option;
    let options = [];
    const months = DateHelper.GetMonths();

    for (let i = 0; i < months.length; i++) {
      options.push(
        <Option key={i} value={i + 1}>
          {months[i]}
        </Option>
      );
    }

    this.setState({
      months: options,
    });
  }

  private populateYears() {
    const startYear = 1950;
    const endYear = new Date().getFullYear() - 9;

    this.populateDate(startYear, endYear, 'years');
  }

  private populateDate(startVal: number, endVal: number, type: string) {
    const Option = Select.Option;
    let options = [];

    for (let i = startVal; i <= endVal; i++) {
      options.push(
        <Option key={i} value={i}>
          {i}
        </Option>
      );
    }
    this.setState({
      [type]: options,
    });
  }
}

export default IntroPersonPage;
