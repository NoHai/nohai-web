import { ReduxActionType } from '../../contracts/enums/common/redux-action.type';
import AuthService from '../../business/services/auth.service';

export const checkLoginResult = (model: any) => ({
    type: ReduxActionType.CheckLoginResult,
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
