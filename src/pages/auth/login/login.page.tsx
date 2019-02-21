import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import './login.page.scss';

class LoginPage extends Component {
    public render() {
        return (
            <div className="auth-page">
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
                    >
                        Autentifica-te
                    </Button>

                    <p className="text-center margin-bottom">sau foloseste contul de Facebook</p>

                    <Button
                        className="margin-bottom facebook"
                        block
                        type="primary"
                        size="large"
                        shape="round"
                    >
                        <span className="icon mdi mdi-facebook" />
                        Login with Facebook
                    </Button>

                    <Row>
                        <Col span={12}>
                            <p>Ti-ai uitat parola?</p>
                        </Col>
                        <Col span={12} className="text-right">
                            <span className="link">Recupereaza-ti parola</span>
                        </Col>
                    </Row>

                    <Button ghost block type="primary" size="large" shape="round">
                        Creeaza-ti un cont
                    </Button>
                </div>
            </div>
        );
    }
}

export default LoginPage;
