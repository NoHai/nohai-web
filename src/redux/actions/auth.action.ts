import AuthService from '../../business/services/auth.service';
import { ReduxAuthActionType } from '../../contracts/enums/actions';
import TokenProvider from '../../utilities/providers/token.provider';
import { GetTokenNotification } from '../../business/services/push-notification.service';
import { UserTokenNotificationService } from '../../business/services/user-token-notification.service';

export const loginResult = (model: any) => ({
  type: ReduxAuthActionType.LoginResult,
  result: model,
});

export const checkLoginResult = (model: any) => ({
  type: ReduxAuthActionType.CheckLoginResult,
  result: model,
});

export const login = (username: string, password: string) => {
  return (dispatch: any) => {
    loginUser(username, password)
      .then(isCompleted)
      .then(setNotificationToken)
      .then(loginDispatch(dispatch));
  };
};

export const checkLogin = () => {
  return (dispatch: any) => {
    isAuthorized()
      .then(isCompleted)
      .then(setNotificationToken)
      .then(checkLoginDispatch(dispatch));
  };
};

export const registerComplete = () => {
  return (dispatch: any) => {
    const result = {
      isLoaded: true,
      isAuthorized: true,
      isCompleted: true,
    };
    dispatch(loginResult(result));
    return result;
  };
};

export const logout = () => {
  return (dispatch: any) => {
    GetTokenNotification(false).then(token => {
      UserTokenNotificationService.Delete(token).then(() => {
        TokenProvider.removeToken().then(() => {
          const model = {
            isLoaded: true,
            isAuthorized: false,
            isCompleted: false,
          };

          const data = {
            type: ReduxAuthActionType.Logout,
            result: model,
          };

          dispatch(data);
        });
      });
    });
  };
};

// export const logout = () => {
//   TokenProvider.removeToken();

//   const model = {
//     isLoaded: true,
//     isAuthorized: false,
//     isCompleted: false,
//   };

//   return {
//     type: ReduxAuthActionType.Logout,
//     result: model,
//   };
// };

function loginDispatch(dispatch: any): (value: any) => void {
  return result => {
    dispatch(loginResult(result));
  };
}

function checkLoginDispatch(dispatch: any): (value: any) => void {
  return result => {
    dispatch(checkLoginResult(result));
  };
}

function loginUser(username: string, password: string) {
  return AuthService.login(username, password).then(isAuthorized => {
    const result = {
      isLoaded: true,
      isAuthorized: isAuthorized,
    };
    return result;
  });
}

function isAuthorized() {
  return AuthService.isAuthorized().then((response: boolean) => {
    const result = {
      isLoaded: true,
      isAuthorized: response,
      isCompleted: false,
    };

    return result;
  });
}

function isCompleted(result: any) {
  if (result && result.isAuthorized) {
    return AuthService.isCompleted().then((response: boolean) => {
      result.isCompleted = response;
      return result;
    });
  }

  return result;
}

function setNotificationToken(result: any) {
  if (result && result.isAuthorized) {
    try {
      return GetTokenNotification(false).then(token => {
        if (token) {
          UserTokenNotificationService.CreateToken(token);
        }

        return result;
      });
    } catch {
      return result;
    }
  }

  return result;
}
