import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Row, Col, Button } from 'antd';
import SportsSelection from '../../../components/sports-selection/sports-selection.component';

class IntroSport extends Component {
    render() {
        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large page-section-with-color align-middle">
                        <h1 className="invert">De ce sport esti pasionat?</h1>

                        <p className="invert margin-bottom">
                            Alege sporturile de care esti pasionat si nivelul la care esti. <br />
                            Pe baza sporturilor selectate iti vom genera timeline-ul
                        </p>

                        <SportsSelection />
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
