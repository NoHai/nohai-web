import React, { Component } from 'react';
import { Router, RouteProps, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import history from './utilities/core/history';
import 'antd/dist/antd.css';
import './App.scss';

import LoginPage from './pages/auth/login/login.page';
import RegisterPage from './pages/auth/register/register.page';
import RecoveryPage from './pages/auth/recovery/recovery.page';
import WrapperPage from './pages/common/wrapper/wrapper.page';
import IntroPage from './pages/intro/intro.page';
import { checkLogin } from './redux/actions/auth.action';
import { initialAuthState } from './redux/reducers/auth.reducer';
import ResetPasswordPage from './pages/auth/reset-password/reset-password.page';
import { AppConfig } from './contracts/models/env-models/app.config';
import AppLoading from './components/app-loading/app-loading.component';
import LoadingHelper from './helpers/loading.helper';
import { notification, Button } from 'antd';
import { canBeInstalled, installApp } from './helpers/install-app.helper';

class App extends Component<any, any> {
  private AppConfig = new AppConfig();

  async componentDidMount() {
    LoadingHelper.hideLoading();
    this.checkLogin();
    await this.initMap();

    this.listenToInstall();
  }

  render() {
    return this.props.isLoaded ? (
      <Router history={history}>
        <div className="app page-sections">
          <div className="page-section page-section-large">
            <Switch>
              <AuthorizationRoute
                path="/login"
                component={LoginPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
              <AuthorizationRoute
                path="/register"
                component={RegisterPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
              <AuthorizationRoute
                path="/recover"
                component={RecoveryPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
              <AuthorizationRoute
                path="/reset-password"
                component={ResetPasswordPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
              <UnCompletedRoute
                path="/intro"
                component={IntroPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
              <PrivateRoute
                component={WrapperPage}
                isAuthorized={this.props.isAuthorized}
                isCompleted={this.props.isCompleted}
              />
            </Switch>
          </div>
        </div>
      </Router>
    ) : (
      <AppLoading />
    );
  }

  private checkLogin() {
    return this.props.checkLogin();
  }

  private async initMap() {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      this.AppConfig.googleApiKey +
      '&libraries=places';
    script.async = true;
    await document.body.appendChild(script);
  }

  private listenToInstall() {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      const appDeferredPrompt = e;

      const win = window as any;
      win.appDeferredPrompt = appDeferredPrompt;

      notification.destroy();
      this.showInstallAppButton();
    });

    window.addEventListener('appinstalled', () => {
      notification.destroy();
    });
  }

  private showInstallAppButton() {
    const isValid = canBeInstalled();

    if (isValid) {
      const args = {
        message: 'Instaleaza aplicatia Nohai',
        description: (
          <div>
            <p>
              Pentru a avea o experienta placuta poti instala aplicatia Nohai pe telefonul tau.
            </p>

            <div>
              <Button
                type="primary"
                shape="round"
                icon="download"
                size="default"
                block={true}
                onClick={() => installApp()}
              >
                Instaleaza
              </Button>
            </div>
          </div>
        ),
        duration: 0,
      };

      notification.open(args);
    }
  }
}

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthorized: boolean;
  isCompleted: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthorized, isCompleted, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthorized ? (
          isCompleted ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to={{ pathname: '/intro' }} />
          )
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

const AuthorizationRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthorized, isCompleted, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        !isAuthorized ? (
          <Component {...routeProps} />
        ) : !isCompleted ? (
          <Redirect to={{ pathname: '/intro' }} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

const UnCompletedRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthorized, isCompleted, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        !isAuthorized ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : !isCompleted ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

const mapStateToProps = ({ authReducer }: any) => authReducer || initialAuthState;

const mapDispatchToProps = {
  checkLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
