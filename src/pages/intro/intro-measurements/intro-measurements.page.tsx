import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import history from '../../../utilities/history';

class IntroMeasurements extends Component {
    render() {
        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <h1>Sa ne cunoastem</h1>

                        <p className="margin-bottom">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, culpa
                            dolores architecto ipsam
                        </p>

                        <div className="form">
                            <div className="form-group">
                                <label>Greutate</label>
                                <Input size="large" addonAfter="kg" />
                            </div>

                            <div className="form-group">
                                <label>Inaltime</label>
                                <Input size="large" addonAfter="cm" />
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <hr />

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
