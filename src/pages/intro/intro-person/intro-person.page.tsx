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
        this.GetYears();
        this.GetMonths();
    }
    async handleChange(event: any) {
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
    handleDayChange(value: any) {
        this.setState((prevState: any) => ({
            registerDetails: {
                ...prevState.registerDetails,
                details: {
                    ...prevState.registerDetails.details,
                    Day: value,
                },
            },
        }));
    }

    async handleMonthChange(value: any) {
        await this.setState((prevState: any) => ({
            registerDetails: {
                ...prevState.registerDetails,
                details: {
                    ...prevState.registerDetails.details,
                    Month: value,
                },
            },
        }));
        await this.GetDays();
    }

    async handleYearChange(value: any) {
        await this.setState((prevState: any) => ({
            registerDetails: {
                ...prevState.registerDetails,
                details: {
                    ...prevState.registerDetails.details,
                    Year: value,
                },
            },
        }));
        await this.GetDays();
    }

    render() {
        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large page-section-with-color align-middle">
                        <h1 className="invert">Sa ne cunoastem</h1>

                        <p className="margin-bottom invert">
                            Ma bucur ca ai ales sa folosesti aplicatia NoHai. <br />
                            Ca se ne cunoastem mai bine as vrea sa stiu cum te numeste si ce varsta
                            ai
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

                            <div className="form-group">
                                <label>Data nasterii</label>

                                <Row gutter={16}>
                                    <Col span={7}>
                                        <Select
                                            size="large"
                                            style={{ width: '100%' }}
                                            value={this.state.registerDetails.details.Year || ''}
                                            onChange={(e: any) => this.handleYearChange(e)}
                                        >
                                            {this.state.years}
                                        </Select>
                                    </Col>

                                    <Col span={10}>
                                        <Select
                                            size="large"
                                            style={{ width: '100%' }}
                                            value={this.state.registerDetails.details.Month || ''}
                                            onChange={(e: any) => this.handleMonthChange(e)}
                                        >
                                            {this.state.months}
                                        </Select>
                                    </Col>

                                    <Col span={7}>
                                        <Select
                                            disabled={
                                                this.state.registerDetails.details.Month ===
                                                    undefined ||
                                                this.state.registerDetails.details.Year ===
                                                    undefined
                                            }
                                            size="large"
                                            style={{ width: '100%' }}
                                            value={this.state.registerDetails.details.Day || ''}
                                            onChange={(e: any) => this.handleDayChange(e)}
                                        >
                                            {this.state.days}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className="page-section page-section-footer">
                        <div className="intro-footer text-right">
                            <Button
                                disabled={!this.checkForm()}
                                type="primary"
                                onClick={() => {
                                    this.GoForward();
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

    checkForm(): boolean {
        if (
            this.state.registerDetails.user.FirstName &&
            this.state.registerDetails.user.LastName &&
            this.state.registerDetails.details.Day &&
            this.state.registerDetails.details.Month &&
            this.state.registerDetails.details.Year
        ) {
            return true;
        } else return false;
    }

    private GoForward() {
        LocalStorageHelper.SaveItemToLocalStorage(
            LocalStorage.IntroInfo,
            this.state.registerDetails
        );
        history.push('/intro/step-two');
    }

    private GetMonths() {
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

    private GetYears() {
        const Option = Select.Option;
        let options = [];

        const startYear = 1950;
        const endYear = new Date().getFullYear() - 9;

        for (let i = startYear; i <= endYear; i++) {
            options.push(
                <Option key={i} value={i}>
                    {i}
                </Option>
            );
        }

        this.setState({
            years: options,
        });
    }

    private async GetDays() {
        const Option = Select.Option;
        let options = [];
        let selectedDate =
            this.state.registerDetails.details.Year +
            '-' +
            this.state.registerDetails.details.Month;
        const startDay = 1;
        const endDay = moment(selectedDate, 'YYYY-MM').daysInMonth();

        for (let i = startDay; i <= endDay; i++) {
            options.push(
                <Option key={i} value={i}>
                    {i}
                </Option>
            );
        }

        await this.setState({
            days: options,
        });
    }
}

export default IntroPersonPage;
