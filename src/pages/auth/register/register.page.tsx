import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Button } from 'antd';
import './register.page.scss';
import { FormValidators } from '../../../contracts/validators/forms-validators';
import AuthService from '../../../business/services/auth.service';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import LocalStorageHelper from '../../../helpers/local-storage.helper';
import { connect } from 'react-redux';
import { login } from './../../../redux/actions/auth.action';
import { initialAuthState } from '../../../redux/reducers/auth.reducer';
import MessageHelper from '../../../helpers/message.helper';

class RegisterPage extends Component<any, any> {
  state = {
    registerDetails: new UserViewModel(),
    confirmationPassword: '',
    passwordError: '',
    confirmationPasswordError: '',
    emailError: '',
  };
  componentDidMount() {
    this.setState({
      registerDetails: LocalStorageHelper.GetItemFromLocalStorage(
        LocalStorage.IntroInfo,
        this.state.registerDetails
      ),
    });
  }

  async handleChange(event: any) {
    let registerDetails = JSON.parse(JSON.stringify(this.state.registerDetails));
    const { name, value } = event.target;
    registerDetails.user[name] = value;
    this.setState({
      registerDetails: registerDetails,
    });
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
                value={this.state.registerDetails.user.Email || ''}
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
                value={this.state.registerDetails.user.Password || ''}
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

  private loginRegisterdUser() {
    return this.props.login(
      this.state.registerDetails.user.Email,
      this.state.registerDetails.user.Password
    );
  }

  private async Register() {
    await this.getFildsValidation();
    let errors = this.getErrorMessage();

    if (errors !== '') {
      MessageHelper.showError(errors);
    } else {
      const registered = await AuthService.register(this.state.registerDetails.user);
      if (registered) {
        history.push("/email-validation")
      }
    }
  }

  private async storeRegisterDetails() {
    let registerDetails = JSON.parse(JSON.stringify(this.state.registerDetails));

    this.setState({
      registerDetails: registerDetails,
    });

    LocalStorageHelper.SaveItemToLocalStorage(LocalStorage.IntroInfo, this.state.registerDetails);
  }

  private getErrorMessage() {
    let errors = '';
    if (this.checkForm()) {
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
    return errors;
  }

  private getFildsValidation() {
    this.setState({
      emailError: FormValidators.emailValidation(this.state.registerDetails.user.Email),
      confirmationPasswordError: FormValidators.matchPasswordsValidation(
        this.state.registerDetails.user.Password,
        this.state.confirmationPassword
      ),
      passwordError: FormValidators.passwordValidation(6, this.state.registerDetails.user.Password),
    });
  }

  private checkForm() {
    return (
      this.state.registerDetails.user.Email !== '' &&
      this.state.registerDetails.user.Password !== '' &&
      this.state.confirmationPassword !== ''
    );
  }
}

const mapStateToProps = (state: any) => {
  if (state.authReducer && state.authReducer.isAuthorized) {
    return {
      isLoaded: state.authReducer.isLoaded,
      isAuthorized: state.authReducer.isAuthorized,
    };
  }

  return initialAuthState;
};

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
