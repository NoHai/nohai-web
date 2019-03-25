import React, { Component } from 'react';
import './intro-person.page.scss';
import { Button, Input, DatePicker, Select } from 'antd';
import history from '../../../utilities/history';

class IntroPersonPage extends Component {
    render() {
        const Option = Select.Option;

        return (
            <div className="intro-step-page">
                <div className="page-sections">
                    <div className="page-section page-section-large">
                        <h1>Sa ne cunoastem</h1>

                        <p>
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
                                <label>Data nasterii</label>
                                <DatePicker size="large" />
                            </div>

                            <div className="form-group">
                                <label>Gen</label>
                                <Select size="large" placeholder="Alege" style={{ width: '100%' }}>
                                    <Option value="m">Masculin</Option>
                                    <Option value="f">Feminin</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <hr />

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