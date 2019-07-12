import AuthService from '../../business/services/auth.service';
import { ReduxAuthActionType } from '../../contracts/enums/actions';

export const checkLoginResult = (model: any) => ({
    type: ReduxAuthActionType.CheckLoginResult,
    result: model,
});

export const checkLogin = () => {
    return (dispatch: any) =>
        AuthService.isAuthorized().then(isAuthorized => {
            const result = {
                isLoaded: true,
                isAuthorized: true,
            };
            dispatch(checkLoginResult(result));
            return result;
        });
};
