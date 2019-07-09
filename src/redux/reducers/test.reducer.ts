import { ReduxActionType } from '../actions/redux-action.type';

const initialState = {};

const testReducer = (state: any = initialState, action: ReduxActionType) => {
    switch (action) {
        case ReduxActionType.Default:
        default:
            return state;
    }
};

export default testReducer;
