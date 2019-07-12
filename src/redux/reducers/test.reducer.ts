import { ReduxActionType } from "../../contracts/enums/common/redux-action.type";

const initialTestState = {};

const testReducer = (state: any = initialTestState, action: ReduxActionType) => {
    switch (action) {
        case ReduxActionType.Default:
        default:
            return state;
    }
};

export default testReducer;
