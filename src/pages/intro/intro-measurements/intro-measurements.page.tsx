import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import history from '../../../utilities/core/history';
import { connect } from 'react-redux';
import { changeRegisterDetails } from '../../../redux/actions/register.action';

class IntroMeasurements extends Component<any, any> {
    async handleChange(event: any) {
        let registerDetails = JSON.parse(JSON.stringify(this.props.registerDetails));
        const { name, value } = event.target;
        registerDetails.details[name] = value;
        this.props.changeRegisterDetails(registerDetails);
    }

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
                                    type="number"
                                    size="large"
                                    addonAfter="kg"
                                    placeholder="Greutatea ta in kilograme"
                                    name="Width"
                                    value={this.props.registerDetails.details.Width || ''}
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
                                    value={this.props.registerDetails.details.Height || ''}
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
                                    {this.props.registerDetails.details.Width &&
                                        this.props.registerDetails.details.Height && (
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    this.GoForward();
                                                }}
                                            >
                                                Urmatorul pas
                                            </Button>
                                        )}
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
)(IntroMeasurements);
