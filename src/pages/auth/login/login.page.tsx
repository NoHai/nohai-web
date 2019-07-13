import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.page.scss';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import history from '../../../utilities/core/history';
import FacebookHelper from '../../../helpers/facebook.helper';
import { initialAuthState } from '../../../redux/reducers/auth.reducer';
import { login } from './../../../redux/actions/auth.action';

declare var FB: any;

class LoginPage extends Component<any, any> {
    componentDidMount() {
        FacebookHelper.Init();
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
                            <input type="text" placeholder="Adresa de email" data-lpignore="true" />
                        </div>

                        <div className="inline-input-wrapper">
                            <span className="icon mdi mdi-key" />
                            <input type="password" placeholder="Parola" data-lpignore="true" />
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

                    <Button
                        className="margin-bottom facebook fb-login-button"
                        block
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={() => {
                            this.fbLogin();
                        }}
                    >
                        <span className="icon mdi mdi-facebook" />
                        Login with Facebook
                    </Button>

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

    public async doLogin() {
        this.props.login('', '');
    }


    private navigateToRegister() {
        history.push('/register');
    }

    private fbLogin() {
        FB.login(
            (response: any) => {
                if (response.authResponse) {
                    this.getFbUserData();
                }
            },
            { scope: 'email' }
        );
    }

    private getFbUserData() {
        FB.api(
            '/me',
            { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
            () => {
                // console.log(process.env.REACT_APP_FACEBOOK_APP_ID);
                // console.table(response);
            }
        );
    }
}

const mapStateToProps = (state: any) => {
    if (state.authReducer && state.authReducer.isAuthorized) {
        history.push('/');
        
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
)(LoginPage);
