import React, { Component } from 'react';
import './email-validation.page.scss';
import TokenProvider from '../../../utilities/providers/token.provider';
import moment from 'moment';
import MessageHelper from '../../../helpers/message.helper';
import history from '../../../utilities/core/history';
import { UserService } from '../../../business/services/user.service';
import LoadingHelper from '../../../helpers/loading.helper';
import { Button } from 'antd';

class EmailValidation extends Component<any, any> {
  state = { email: '', hasToken: false, activated: false };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.token) {
      await this.activateUser(this.props.match.params.token);
    } else {
      this.setState({ email: '', hasToken: false, activated: false });
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
          <span className="text-center">Contul dvs a fost inregistrat, acum va puteti loga in aplicatie</span>
          <Button type="primary" className="login-button" onClick={()=>this.redirectToLogin()}>Continua cu logarea</Button>
        </div>
      );
    } else {
      return (
        <div className="email-validation-page">
          <div className="email-validation-img"></div>
          <span className="text-center title">Incearca din nou!</span>
          <span className="text-center">Activarea contului a esuat</span>
        </div>
      );
    }
  }

  private async activateUser(token: string) {
    LoadingHelper.showLoading();

    const decodedToken = this.processToken(token);
    const result = await UserService.ActivateUser(decodedToken.email);
    this.setState({ activated: result });

    LoadingHelper.hideLoading();
  }

  private processToken(token: string) {
    const decodedToken = TokenProvider.parseToken(token);
    const expirationDate = moment(decodedToken.expireDate).toDate();
    if (moment(expirationDate).isAfter(moment.now())) {
      this.setState({ email: decodedToken.email, hasToken: true });
    } else {
      MessageHelper.showWarning('Ne pare rau dar link-ul a expirat!');
      this.redirectToLogin();
    }
    return decodedToken;
  }

  redirectToLogin() {
    history.push('/login');
  }
}

export default EmailValidation;
