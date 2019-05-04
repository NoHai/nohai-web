import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Button } from 'antd';
import './register.page.scss';

class RegisterPage extends Component {
    public render() {
        return (
            <div className="auth-page">
                <div className="login-logo-container">
                    <div className="login-logo" />
                </div>

                <div className="auth-page-container">
                    <div className="auth-page-form-group">
                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-email-outline" />
                            <input type="text" placeholder="Adresa de email" data-lpignore="true" />
                        </div>

                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input type="password" placeholder="Parola" data-lpignore="true" />
                        </div>

                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input
                                type="password"
                                placeholder="Confirma parola"
                                data-lpignore="true"
                            />
                        </div>
                    </div>

                    <Button
                        className="margin-bottom margin-bottom-large"
                        block
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={() => {
                            this.Register();
                        }}
                    >
                        Creeaza cont
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
                        Am deja un cont
                    </Button>
                </div>
            </div>
        );
    }

    private NavigateToRegister() {
        history.push('/login');
    }

    private Register() {
        history.push('/intro');
    }
}

export default RegisterPage;
