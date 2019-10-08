import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.page.scss';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import history from '../../../utilities/core/history';
import { initialAuthState } from '../../../redux/reducers/auth.reducer';
import { login, checkLogin } from './../../../redux/actions/auth.action';
import AuthService from '../../../business/services/auth.service';
import FacebookLogin from 'react-facebook-login';
import { AppConfig } from '../../../contracts/models/env-models/app.config';

class LoginPage extends Component<any, any> {
  state = { email: '', password: '', isLogIn: false, userId: '', name: '' };
  private AppConfig = new AppConfig();

  async handleChange(event: any) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async responseFacebook(response: any) {
    if (response && response.email && response.name) {
      await AuthService.loginWithFb(response.accessToken, response.userID);
      this.props.checkLogin();
      this.navigateToEvents();
    }
  }

  public render() {
    const fbContent = this.getFacebookButton();

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
                name="email"
                value={this.state.email}
                type="email"
                placeholder="Adresa de email"
                autoComplete="off"
                data-lpignore="true"
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="inline-input-wrapper">
              <span className="icon mdi mdi-key" />
              <input
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Parola"
                data-lpignore="true"
                autoComplete="off"
                onChange={e => this.handleChange(e)}
              />
            </div>
          </div>

          <Button
            className="margin-bottom"
            block
            type="primary"
            size="large"
            shape="round"
            onClick={async () => {
              await this.doLogin();
            }}
          >
            Autentifica-te
          </Button>

          <p className="text-center margin-bottom">sau foloseste contul de Facebook</p>

          <div className="margin-bottom facebook fb-login-button">{fbContent}</div>

          <Row>
            <Col span={12}>
              <p>Ti-ai uitat parola?</p>
            </Col>
            <Col span={12} className="text-right">
              <Link className="link" to="/recover">
                Recupereaza-ti parola
              </Link>
            </Col>
          </Row>

          <Button
            ghost
            block
            type="primary"
            size="large"
            shape="round"
            onClick={() => {
              this.navigateToRegister();
            }}
          >
            Creeaza-ti un cont
          </Button>
        </div>
      </div>
    );
  }

  private getFacebookButton() {
    let fbContent;
    if (this.state.isLogIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId={this.AppConfig.facebookAppId || ''}
          autoLoad={false}
          fields="name,email,picture"
          callback={e => this.responseFacebook(e)}
          cssClass="facebook"
          icon="icon mdi mdi-facebook"
        />
      );
    }

    return fbContent;
  }

  public async doLogin() {
    this.props.login(this.state.email, this.state.password);
  }

  private navigateToRegister() {
    history.push('/register');
  }

  private navigateToEvents() {
    history.push('/');
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
  checkLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
