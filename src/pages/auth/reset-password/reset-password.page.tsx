import React, { Component } from 'react';
import { Button } from 'antd';
import './reset-password.page.scss';
import { UserService } from '../../../business/services';
import { FormValidators } from '../../../contracts/validators/forms-validators';
import { UserModel } from '../../../contracts/models';
import MessageHelper from '../../../helpers/message.helper';

class ResetPasswordPage extends Component {
    state = {
        password: '',
        confirmationPassword: '',
        passwordError: '',
        confirmationPasswordError: '',
    };

    async handleChange(event: any) {
        const { name, value } = event.target;
        await this.setState({ [name]: value });
    }
    public async validatePassword() {
        if (this.state.password !== '') {
            await this.setState({
                confirmationPasswordError: FormValidators.matchPasswordsValidation(
                    this.state.password,
                    this.state.confirmationPassword
                ),
                passwordError: FormValidators.passwordValidation(6, this.state.password),
            });
        } else {
            await this.setState({
                passwordError: 'completeaza te rog parola',
            });
        }
    }
    public render() {
        return (
            <div className="auth-page">
                <div className="login-logo-container">
                    <div className="login-logo" />
                </div>

                <div className="auth-page-container">
                    <div className="auth-page-form-group">
                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input
                                type="email"
                                placeholder="Noua Parola"
                                data-lpignore="true"
                                name="password"
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input
                                type="password"
                                placeholder="Confirma Parola"
                                data-lpignore="true"
                                name="confirmationPassword"
                                onChange={e => this.handleChange(e)}
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
                            this.ResetPassword();
                        }}
                    >
                        Salveaza Parola
                    </Button>
                </div>
            </div>
        );
    }

    private async ResetPassword() {
        await this.validatePassword();
        let errors = this.getErrorMessage();
        if (errors!=='') {
            MessageHelper.showError(errors);
        } else {
            UserService.ResetPassword(new UserModel());
        //history.push('/login');

        }
    }

    private getErrorMessage() {
        let errors = '';
        if (this.state.password!=='') {
            errors =
                    this.state.passwordError
                    ? this.state.passwordError
                    : this.state.confirmationPasswordError
                    ? this.state.confirmationPasswordError
                    : '';
        } else {
            errors = 'toate campurile sunt obligatorii';
        }
        return errors;
    }
}

export default ResetPasswordPage;
