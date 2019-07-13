import { ReduxAuthActionType } from '../../contracts/enums/actions';

export const initialAuthState = {
    isLoaded: false,
    isAuthorized: false,
};

const authReducer = (state: any = initialAuthState, action: any) => {
    switch (action.type) {
        case ReduxAuthActionType.CheckLoginResult:
        case ReduxAuthActionType.LoginResult:
        case ReduxAuthActionType.Logout:
            return action.result;
        case ReduxAuthActionType.CheckLogin:
        case ReduxAuthActionType.Login:
        default:
            return state;
    }
};

export default authReducer;
