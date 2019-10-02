import AuthService from '../../business/services/auth.service';
import { ReduxAuthActionType } from '../../contracts/enums/actions';
import TokenProvider from '../../utilities/providers/token.provider';
import { GetTokenNotification } from '../../business/services/push-notification.service';
import { UserTokenNotificationService } from '../../business/services/user-token-notification.service';

export const checkLoginResult = (model: any) => ({
  type: ReduxAuthActionType.CheckLoginResult,
  result: model,
});

export const checkLogin = () => {
  const result = {
    isLoaded: true,
    isAuthorized: false,
    isCompleted: false,
  };
  return (dispatch: any) => {
    AuthService.isAuthorized().then(isAuthorized => {
      result.isAuthorized = isAuthorized;

      if (isAuthorized) {
        AuthService.isCompleted().then(isCompleted => {
          result.isCompleted = isCompleted;
          dispatch(checkLoginResult(result));
          return result;
        });
      } else {
        dispatch(checkLoginResult(result));
      }
    });
  };
};

export const loginResult = (result: any) => ({
  type: ReduxAuthActionType.LoginResult,
  result: result,
});

export const login = (username: string, password: string) => {
  return (dispatch: any) => {
    loginUser(username, password)
      .then(isCompleted)
      .then(setNotificationToken)
      .then(loginDispatch(dispatch));
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

function loginUser(username: string, password: string) {
  return AuthService.login(username, password).then(isAuthorized => {
    const result = {
      isLoaded: true,
      isAuthorized: isAuthorized,
    };
    return result;
  });
}

function isCompleted(result: any) {
  if (result && result.isAuthorized) {
    return AuthService.isCompleted().then(isCompleted => {
      result.isCompleted = isCompleted;
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
