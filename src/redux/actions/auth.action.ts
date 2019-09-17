import AuthService from '../../business/services/auth.service';
import { ReduxAuthActionType } from '../../contracts/enums/actions';
import TokenProvider from '../../utilities/providers/token.provider';

export const checkLoginResult = (model: any) => ({
    type: ReduxAuthActionType.CheckLoginResult,
    result: model,
});

export const checkUserDetailsResult = (model: any) => ({
    type: ReduxAuthActionType.CheckUserDetailsResult,
    result: model,
});

export const checkLogin = () => {
    return (dispatch: any) =>
        AuthService.isAuthorized().then(isAuthorized => {
            const result = {
                isLoaded: true,
                isAuthorized: isAuthorized,
            };
            dispatch(checkLoginResult(result));
            return result;
        });
};

export const checkUserDetails = () => {
    return (dispatch: any) =>
        AuthService.isCompleted().then(isCompleted => {
            const result = {
                isLoaded: true,
                isCompleted: isCompleted,
            };
            dispatch(checkUserDetailsResult(result));
            return result;
        });
};

export const loginResult = (result: any) => ({
    type: ReduxAuthActionType.LoginResult,
    result: result,
});

export const login = (username: string, password: string) => {
    return (dispatch: any) => {
        AuthService.login(username, password).then(isAuthorized => {
            const result = {
                isLoaded: true,
                isAuthorized: isAuthorized,
            };
            dispatch(loginResult(result));
            return result;
        });
    };
};

export const logout = () => {
    TokenProvider.removeToken();
    const model = {
        isLoaded: true,
        isAuthorized: false,
        isCompleted: false,
    }

    return {
        type: ReduxAuthActionType.Logout,
        result: model,
    }
}
