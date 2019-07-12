import { ReduxAuthActionType } from "../../contracts/enums/actions";

export const initialAuthState = {
    isLoaded: false,
    isAuthorized: false,
};

const authReducer = (state: any = initialAuthState, action: any) => {
    switch (action.type) {
        case ReduxAuthActionType.CheckLogin:
            return state;
        case ReduxAuthActionType.CheckLoginResult:
            return action.result;
        default:
            return state;
    }
};

export default authReducer;
