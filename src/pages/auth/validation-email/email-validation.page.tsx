import React, { Component } from 'react';
import './email-validation.page.scss';
import TokenProvider from '../../../utilities/providers/token.provider';
import moment from 'moment';
import MessageHelper from '../../../helpers/message.helper';
import history from '../../../utilities/core/history';
import { UserService } from '../../../business/services/user.service';
import LoadingHelper from '../../../helpers/loading.helper';
class EmailValidation extends Component<any> {
  state = { email: '', hasToken: false, activated: false };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.token) {
      await this.activateUser(this.props.match.params.token);
    } else {
      this.setState({ email: '', hasToken: false, activated: false });
    }
  }

  public render() {
    if (this.state.hasToken === false) {
      return (
        <div className="auth-page">
          <div className="email-validation-img"></div>
          <span className="text-center invert">Multumim pentru inregistrare</span>
          <span className="text-center invert">
            Te rugam sa verifici adresa de email pentru a confirma inregistrarea.
          </span>
        </div>
      );
    } else if (this.state.activated == true) {
      return (
        <div className="auth-page">
          <div className="email-validation-img"></div>
          <span className="text-center invert">Contul tau a fost inregistrat</span>
          <span className="text-center invert">Bine ai venit in echipa NoHai!</span>
        </div>
      );
    } else {
      return (
        <div className="auth-page">
          <div className="email-validation-img"></div>
          <span className="text-center invert">Activarea contului a esuat</span>
          <span className="text-center invert">Incearca din nou!</span>
        </div>
      );
    }
  }

  private async activateUser(token: string) {
    LoadingHelper.showLoading();

    this.processToken(token);
    const result = await UserService.ActivateUser(this.state.email);
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
  }

  redirectToLogin() {
    history.push('/login');
  }
}

export default EmailValidation;
