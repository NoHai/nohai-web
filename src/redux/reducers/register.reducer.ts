import { UserViewModel } from '../../contracts/view-models/user-view.model';
import { ReduxRegisterActionType } from '../../contracts/enums/actions';

export const initialRegisterReducerState = {
    registerDetails: new UserViewModel(),
    canGoNext: false,
};

const registerReducer = (state: any = initialRegisterReducerState, action: any) => {
    switch (action.type) {
        case ReduxRegisterActionType.ChangeRegisterDetails:
            return {
                ...state,
                registerDetails: action.result
            };
        default:
            return state;
    }
};

export default registerReducer;
