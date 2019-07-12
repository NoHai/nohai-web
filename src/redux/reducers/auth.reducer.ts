import { ReduxActionType } from '../../contracts/enums/common/redux-action.type';

export const initialAuthState = {
    isLoaded: false,
    isAuthorized: false,
};

const authReducer = (state: any = initialAuthState, action: any) => {
    switch (action.type) {
        case ReduxActionType.CheckLogin:
            return state;
        case ReduxActionType.CheckLoginResult:
            return action.result;
        default:
            return state;
    }
};

export default authReducer;
