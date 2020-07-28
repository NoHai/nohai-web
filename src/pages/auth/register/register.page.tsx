import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthService from '../../../business/services/auth.service';
import { LocalStorage } from '../../../contracts/enums/localStorage/local-storage';
import { FormValidators } from '../../../contracts/validators/forms-validators';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';
import LocalStorageHelper from '../../../helpers/local-storage.helper';
import MessageHelper from '../../../helpers/message.helper';
import { initialAuthState } from '../../../redux/reducers/auth.reducer';
import history from '../../../utilities/core/history';
import { login } from './../../../redux/actions/auth.action';
import './register.page.scss';

class RegisterPage extends Component<any, any> {
  termsAndConditions = false;
  state = {
    registerDetails: new UserViewModel(),
    confirmationPassword: '',
    passwordError: '',
    confirmationPasswordError: '',
    emailError: '',
    termsAndConditionsError: '',
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

  goToTermsPage() {
    history.push('/terms-and-conditions');
  }

  handleTermsChange(event: any) {
    this.termsAndConditions = event.target.checked;
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
                onChange={(e) => this.handleChange(e)}
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
                onChange={(e) => this.handleChange(e)}
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
                onChange={(e) => this.confirmationPasswordChange(e)}
                required
              />
            </div>
            <input
              className="checkBox"
              type="checkbox"
              onChange={(event) => this.handleTermsChange(event)}
            />
            <label className="checkBoxContainer link" onClick={() => this.goToTermsPage()}>
              Accept termenii și condițiile
            </label>
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
        history.push('/email-validation');
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
          : this.state.confirmationPasswordError
          ? this.state.termsAndConditionsError
          : this.state.termsAndConditionsError;
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
      termsAndConditionsError: FormValidators.checkTermsAndCondValidation(this.termsAndConditions),
    });
  }

  private checkForm() {
    return (
      this.state.registerDetails.user.Email !== '' ||
      this.state.registerDetails.user.Password !== '' ||
      this.state.confirmationPassword !== '' ||
      this.state.termsAndConditionsError !== ''
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
