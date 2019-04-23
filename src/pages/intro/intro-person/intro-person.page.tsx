import React, { Component } from 'react';
import { Button, Input, Slider, Row, Col, InputNumber } from 'antd';
import history from '../../../utilities/history';

class IntroPersonPage extends Component {
    state = {
        inputValue: 24,
    };

    onAgeChange = (value: any) => {
        this.setState({
            inputValue: value,
        });
    };

    render() {
        const { inputValue } = this.state;

        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large page-section-with-color align-middle">
                        <h1 className="invert">Sa ne cunoastem</h1>

                        <p className="margin-bottom invert">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, culpa
                            dolores architecto ipsam
                        </p>

                        <div className="form">
                            <div className="form-group">
                                <label>Prenume</label>
                                <Input size="large" />
                            </div>

                            <div className="form-group">
                                <label>Nume</label>
                                <Input size="large" />
                            </div>

                            <div className="form-group">
                                <label>Varsta</label>

                                <Row>
                                    <Col span={18}>
                                        <Slider
                                            min={18}
                                            max={99}
                                            onChange={this.onAgeChange}
                                            value={typeof inputValue === 'number' ? inputValue : 0}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <InputNumber
                                            size="large"
                                            min={18}
                                            max={99}
                                            style={{ marginLeft: 16 }}
                                            value={inputValue}
                                            onChange={this.onAgeChange}
                                        />
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
}

export default IntroPersonPage;
