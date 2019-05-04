import React, { Component } from 'react';
import { Button, Input, Row, Col, Select } from 'antd';
import history from '../../../utilities/history';
import DateHelper from '../../../helpers/date.helper';

class IntroPersonPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        day: 26,
        month: 1,
        year: 1989,
    };

    onFirstNameChange = (value: any) => {
        this.setState({
            firstName: value,
        });
    };

    onLastNameChange = (value: any) => {
        this.setState({
            lastName: value,
        });
    };

    onDayChange = (value: any) => {
        this.setState({
            day: value,
        });
    };

    onMonthChange = (value: any) => {
        this.setState({
            month: value,
        });
    };

    onYearChange = (value: any) => {
        this.setState({
            year: value,
        });
    };

    render() {
        const { firstName, lastName, day, month, year } = this.state;
        const months = this.GetMonths();
        const years = this.GetYears();
        const days = this.GetDays();

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
                                    defaultValue={firstName}
                                    placeholder="Prenumele tau"
                                    onChange={this.onFirstNameChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nume</label>
                                <Input
                                    size="large"
                                    defaultValue={lastName}
                                    placeholder="Numele tau"
                                    onChange={this.onLastNameChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Data nasterii</label>

                                <Row gutter={16}>
                                    <Col span={7}>
                                        <Select
                                            size="large"
                                            defaultValue={day}
                                            style={{ width: '100%' }}
                                            onChange={this.onDayChange}
                                        >
                                            {days}
                                        </Select>
                                    </Col>

                                    <Col span={10}>
                                        <Select
                                            size="large"
                                            defaultValue={month}
                                            style={{ width: '100%' }}
                                            onChange={this.onMonthChange}
                                        >
                                            {months}
                                        </Select>
                                    </Col>

                                    <Col span={7}>
                                        <Select
                                            size="large"
                                            defaultValue={year}
                                            style={{ width: '100%' }}
                                            onChange={this.onYearChange}
                                        >
                                            {years}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <img className="wave" src="/assets/wave.svg" alt="" />

                        <div className="intro-footer text-right">
                            <Button
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

    private GoForward() {
        history.push('/intro/step-two');
    }

    private GetMonths() {
        const Option = Select.Option;
        let options = [];
        const months = DateHelper.GetMonths();

        for (let i = 0; i < months.length; i++) {
            options.push(<Option value={i + 1}>{months[i]}</Option>);
        }

        return options;
    }

    private GetYears() {
        const Option = Select.Option;
        let options = [];

        const startYear = 1920;
        const endYear = new Date().getFullYear() - 17;

        for (let i = startYear; i <= endYear; i++) {
            options.push(<Option value={i}>{i}</Option>);
        }

        return options;
    }

    private GetDays() {
        const Option = Select.Option;
        let options = [];

        const startDay = 1;
        const endDay = 31;

        for (let i = startDay; i <= endDay; i++) {
            options.push(<Option value={i}>{i}</Option>);
        }

        return options;
    }
}

export default IntroPersonPage;
