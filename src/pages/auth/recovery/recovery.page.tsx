import React, { Component } from 'react';
import history from './../../../utilities/history';
import { Button } from 'antd';
import './recovery.page.scss';

class RecoveryPage extends Component {
    public render() {
        return (
            <div className="auth-page">
                <div className="auth-page-container">
                    <div className="auth-page-form-group">
                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-email-outline" />
                            <input type="email" placeholder="Adresa de email" data-lpignore="true" />
                        </div>
                    </div>

                    <Button
                        className="margin-bottom margin-bottom-large"
                        block
                        type="primary"
                        size="large"
                        shape="round"
                    >
                        Recuperare parola
                    </Button>

                    <Button
                        ghost
                        block
                        type="primary"
                        size="large"
                        shape="round"
                        className="back-button"
                        onClick={() => {
                            this.NavigateToRegister();
                        }}
                    >
                        <div className="icon mdi mdi-keyboard-backspace" />
                        Authentifica-te acum
                    </Button>
                </div>
            </div>
        );
    }

    private NavigateToRegister() {
        history.push('/login');
    }
}

export default RecoveryPage;
