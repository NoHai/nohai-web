import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Button, message } from 'antd';
import './register.page.scss';
import { connect } from 'react-redux';
import { changeRegisterDetails } from '../../../redux/actions/register.action';
import { FormValidators } from '../../../contracts/validators/forms-validators';

class RegisterPage extends Component<any, any> {
    state = {
        confirmationPassword: '',
        passwordError: '',
        confirmationPasswordError: '',
        emailError: '',
    };

    async handleChange(event: any) {
        let registerDetails = JSON.parse(JSON.stringify(this.props.registerDetails));
        const { name, value } = event.target;
        registerDetails.user[name] = value;
        this.props.changeRegisterDetails(registerDetails);
    }

    async confirmationPasswordChange(event: any) {
        const { value } = event.target;

        this.setState({
            confirmationPassword: value,
        });
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
                            <span className="icon mdi mdi-email-outline" />
                            <input
                                type="text"
                                placeholder="Adresa de email"
                                data-lpignore="true"
                                name="Email"
                                value={this.props.registerDetails.user.Email || ''}
                                onChange={e => this.handleChange(e)}
                                required
                            />
                        </div>
                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input
                                type="password"
                                placeholder="Parola"
                                data-lpignore="true"
                                name="Password"
                                value={this.props.registerDetails.user.Password || ''}
                                onChange={e => this.handleChange(e)}
                                required
                            />
                        </div>

                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input
                                type="password"
                                placeholder="Confirma parola"
                                data-lpignore="true"
                                name="confirmationPassword"
                                value={this.state.confirmationPassword || ''}
                                onChange={e => this.confirmationPasswordChange(e)}
                                required
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

    private async Register() {
        await this.getErrorMessage();

        let errors = '';
        if (this.chekForm()) {
            errors =
                this.state.emailError !== ''
                    ? this.state.emailError
                    : this.state.passwordError
                    ? this.state.passwordError
                    : this.state.confirmationPasswordError
                    ? this.state.confirmationPasswordError
                    : '';
        } else {
            errors = 'toate campurile sunt obligatorii';
        }

        if (errors !== '') {
            const error = () => {
                message.error(errors);
            };
            error();
        }else{
            history.push('/login');
        }
    }

    private getErrorMessage() {
        this.setState({
            emailError: FormValidators.emailValidation(this.props.registerDetails.user.Email),
            confirmationPasswordError: FormValidators.matchPasswordsValidation(
                this.props.registerDetails.user.Password,
                this.state.confirmationPassword
            ),
            passwordError: FormValidators.passwordValidation(
                6,
                this.props.registerDetails.user.Password
            ),
        });
    }

    private chekForm() {
        return (
            this.props.registerDetails.user.Email !== '' &&
            this.props.registerDetails.user.Password !== '' &&
            this.state.confirmationPassword !== ''
        );
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
)(RegisterPage);
