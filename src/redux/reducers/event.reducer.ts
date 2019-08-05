import { ReduxCommonActionType } from '../../contracts/enums/actions';
import { EventDetailsViewModel } from '../../contracts/models';

export const initialCreateEventState = {
    eventDetails: new EventDetailsViewModel(),
};

const eventReducer = (state: any = initialCreateEventState, action: any) => {
    switch (action.type) {
        case ReduxCommonActionType.ChangeEventDetails:
            return {
                ...state,
                eventDetails: action.result
            };
        default:
            return state;
    }
};

export default eventReducer;
