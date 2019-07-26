import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Row, Col, Button } from 'antd';
import SportsSelection from '../../../components/sports-selection/sports-selection.component';
import { connect } from 'react-redux';
import { changeRegisterDetails } from '../../../redux/actions/register.action';

class IntroSport extends Component<any, any> {
    async onCloseDrawer(sport: string, level: string) {
        let registerDetails = JSON.parse(JSON.stringify(this.props.registerDetails));
        registerDetails.details.Sport = sport;
        registerDetails.details.Level = level;
        this.props.changeRegisterDetails(registerDetails);
    }

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

                        <SportsSelection
                            sport={this.props.registerDetails.details.Sport}
                            level={this.props.registerDetails.details.Level}
                            onCloseDrawer={(sport, level) => this.onCloseDrawer(sport, level)}
                        />
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

const mapStateToProps = ({ registerReducer }: any) => {
    return {
        registerDetails: registerReducer.registerDetails,
    };
};

const mapDispatchToProps = {
    changeRegisterDetails,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroSport);
