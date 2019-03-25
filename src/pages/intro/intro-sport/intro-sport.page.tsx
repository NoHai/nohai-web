import React, { Component } from 'react';
import history from '../../../utilities/history';
import { Row, Col, Button } from 'antd';

class IntroSport extends Component {
    render() {
        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <h1>De care sport esti interesat?</h1>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, culpa
                            dolores architecto ipsam
                        </p>
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

    private GoForward() {
        history.push('/');
    }

    private GoBack() {
        history.push('/intro/step-two');
    }
}

export default IntroSport;
