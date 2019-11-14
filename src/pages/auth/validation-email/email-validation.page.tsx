import React, { Component } from 'react';
import './email-validation.page.scss';

class EmailValidation extends Component {
  public render() {
    return (
      <div className="auth-page">
        <div className="email-validation-img"></div>
        <span className="text-center invert">Multumim pentru inregistrare</span>
        <span className="text-center invert">
          Te rugam sa verifici adresa de email pentru a confirma inregistrarea.
        </span>
      </div>
    );
  }
}

export default EmailValidation;
