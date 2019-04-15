import React, { Component } from 'react';
import { Button, Input, DatePicker, Select } from 'antd';
import history from '../../../utilities/history';

class IntroPersonPage extends Component {
    render() {
        const Option = Select.Option;

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
