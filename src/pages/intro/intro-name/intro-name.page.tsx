import React, { Component } from 'react';
import './intro-name.page.scss';
import { Button, Row, Col, Input, DatePicker } from 'antd';

class IntroNamePage extends Component {
    render() {
        return (
            <div className="intro-name-page">
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
                        </div>
                    </div>

                    <div className="page-section">
                        <hr />

                        <div className="intro-footer text-right">
                            <Button type="primary">Urmatorul pas</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IntroNamePage;
