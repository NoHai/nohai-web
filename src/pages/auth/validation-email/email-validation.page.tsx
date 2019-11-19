import React, { Component } from 'react';
import './email-validation.page.scss';
import TokenProvider from '../../../utilities/providers/token.provider';
import moment from 'moment';
import history from '../../../utilities/core/history';
import { UserService } from '../../../business/services/user.service';
import LoadingHelper from '../../../helpers/loading.helper';
import { Button } from 'antd';
import MessageHelper from '../../../helpers/message.helper';

class EmailValidation extends Component<any, any> {
  state = {email: '', hasToken: false, activated: false };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.token) {
      await this.activateUser(this.props.match.params.token);
    } else {
      this.setState({ hasToken: false, activated: false });
    }
  }

  public render() {
    if (!this.state.hasToken) {
      return (
        <div className="email-validation-page">
          <div className="email-validation-img"></div>
          <span className="text-center title">Multumim pentru inregistrare!</span>
          <span className="text-center">
            Te rugam sa iti verifici adresa de email pentru a confirma inregistrarea.
          </span>
        </div>
      );
    } else if (this.state.activated) {
      return (
        <div className="email-validation-page">
          <div className="email-validation-img"></div>
          <span className="text-center title">Bine ai venit in echipa NoHai!</span>
          <span className="text-center">
            Contul dumneavoastra a fost inregistrat, acum va puteti loga in aplicatie.
          </span>
          <Button type="primary" className="login-button" onClick={() => this.redirectToLogin()}>
            Continua cu logarea
          </Button>
        </div>
      );
    } else {
      return (
        <div className="email-validation-page">
          <div className="email-validation-img"></div>
          <span className="text-center title">Incearca din nou!</span>
          <span className="text-center">Link-ul de confirmare a expirat.</span>
          <Button type="primary" className="login-button" onClick={() => this.resentConfirmationEmail(this.state.email)}>
            Retrimite email de confirmare
          </Button>
        </div>
      );
    }
  }

  private async activateUser(token: string) {
    LoadingHelper.showLoading();

    this.processToken(token);

    LoadingHelper.hideLoading();
  }

  private async processToken(token: string) {
    try {
      const decodedToken = TokenProvider.parseToken(token);
      const expirationDate = moment(decodedToken.expireDate).toDate();
      const email = decodedToken.email;
      if (moment(expirationDate).isAfter(moment.now())) {
        this.setState({ email, hasToken: true });
        await this.sendActivationEmail(email);
      } else {
        this.setState({ email, hasToken: true, activated: false });
      }
    } catch (er) {
      MessageHelper.showError('Link confirmare invalid!');
      this.redirectToLogin();
    }
  }

  private async sendActivationEmail(email: string) {
    const result = await UserService.ActivateUser(email);
    this.setState({ activated: result });
  }

  private async resentConfirmationEmail(email: string){
    await UserService.ResendActivationEmail(email);
    this.setState({hasToken: false, activated: false });
  }

  redirectToLogin() {
    history.push('/login');
  }
}

export default EmailValidation;
