import React, { Component } from 'react';
import history from '../../../utilities/core/history';
import { Button } from 'antd';
import './recovery.page.scss';
import { UserService } from '../../../business/services';
import { FormValidators } from '../../../contracts/validators/forms-validators';
import MessageHelper from '../../../helpers/message.helper';
import LoadingHelper from '../../../helpers/loading.helper';

class RecoveryPage extends Component {
  state = { email: '', emailError: '', emailSent: false };

  componentDidMount(): any {
    LoadingHelper.hideLoading();
  }

  async handleChange(event: any) {
    const { name, value } = event.target;
    await this.setState({ [name]: value });
  }
  public async validateEmail() {
    if (this.state.email !== '') {
      await this.setState({
        emailError: FormValidators.emailValidation(this.state.email),
      });
    } else {
      await this.setState({
        emailError: 'adresa de email nu trebuie sa fie goala',
      });
    }
  }
  public render() {
    return (
      <div className="auth-page recovery-page">
        <div className="login-logo-container">
          <div className="login-logo" />
        </div>

        <div className="auth-page-container">
          {!this.state.emailSent && (
            <div className="auth-page-form-group">
              <div className="inline-input-wrapper">
                <span className="icon mdi mdi-email-outline" />
                <input
                  type="email"
                  placeholder="Adresa de email"
                  data-lpignore="true"
                  name="email"
                  onChange={e => this.handleChange(e)}
                />
              </div>
            </div>
          )}
          {!this.state.emailSent && (
            <Button
              className="margin-bottom margin-bottom-large"
              block
              type="primary"
              size="large"
              shape="round"
              onClick={() => {
                this.RecoveryPassword();
              }}
            >
              Recuperare parola
            </Button>
          )}

          {this.state.emailSent && (
            <div className="text-align">Email trimis, te rugam sa iti verifici emailul pentru a alege noua parola</div>
          )}

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
  private async RecoveryPassword() {
    await this.validateEmail();
    if (this.state.emailError !== '') {
      MessageHelper.showError(this.state.emailError);
    } else {
      UserService.RecoveryPassword(this.state.email);
      this.setState({
        emailSent: true,
      });
    }
  }
}

export default RecoveryPage;
