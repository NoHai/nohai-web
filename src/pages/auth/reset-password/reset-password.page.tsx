import React, { Component } from 'react';
import { Button } from 'antd';
import './reset-password.page.scss';
import { UserService } from '../../../business/services';
import { FormValidators } from '../../../contracts/validators/forms-validators';
import { UserModel } from '../../../contracts/models';
import MessageHelper from '../../../helpers/message.helper';
import { match } from 'react-router';
import history from '../../../utilities/core/history';
import TokenProvider from '../../../utilities/providers/token.provider';
import moment from 'moment';

interface TokenParams {
  token: string;
}

interface TokenProps {
  match?: match<TokenParams>;
}

class ResetPasswordPage extends Component<TokenProps> {
  state = {
    email: '',
    password: '',
    confirmationPassword: '',
    passwordError: '',
    confirmationPasswordError: '',
  };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.token) {
      const decodedToken = TokenProvider.parseToken(this.props.match.params.token);
      const expirationDate = moment(decodedToken.expireDate).toDate();
      if (moment(expirationDate).isAfter(moment.now())) {
        this.setState({email: decodedToken.email});
      } else {
        MessageHelper.showWarning('Ne pare rau dar link-ul a expirat!');
        this.redirectToLogin();
      }
    }
  }

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
                type="password"
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
    const errors = this.getErrorMessage();
    if (errors !== '') {
      MessageHelper.showError(errors);
    } else {
      const user = new UserModel();
      user.Password = this.state.password;
      user.Email = this.state.email;
      const result = await UserService.ResetPassword(user);
      if (result === true){
        MessageHelper.showSuccess('Parola schimbata cu sucess!');
        this.redirectToLogin();
      } else {
        MessageHelper.showError('Parola nu a putut fi schimbata!');
        this.redirectToLogin();
      }
    }
  }

  private getErrorMessage() {
    let errors = '';
    if (this.state.password !== '') {
      errors = this.state.passwordError
        ? this.state.passwordError
        : this.state.confirmationPasswordError
        ? this.state.confirmationPasswordError
        : '';
    } else {
      errors = 'toate campurile sunt obligatorii';
    }
    return errors;
  }

  private redirectToLogin() {
    history.push('/login');
  }
}

export default ResetPasswordPage;
