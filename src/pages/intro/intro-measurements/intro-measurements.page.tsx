import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import history from '../../../utilities/core/history';

class IntroMeasurements extends Component {
    render() {
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
                                <label>Greutate</label>
                                <Input
                                    size="large"
                                    addonAfter="kg"
                                    placeholder="Greutatea ta in kilograme"
                                />
                            </div>

                            <div className="form-group">
                                <label>Inaltime</label>
                                <Input
                                    size="large"
                                    addonAfter="cm"
                                    placeholder="Inaltime ta in centimetri"
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
        history.push('/intro/step-three');
    }

    private GoBack() {
        history.push('/intro/step-one');
    }
}

export default IntroMeasurements;
