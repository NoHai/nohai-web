import { ReduxCommonActionType } from '../../contracts/enums/actions';
import { EventDetailsViewModel } from '../../contracts/models';

export const initialCreateEventState = {
    currentSlide: 0,
    eventDetails: new EventDetailsViewModel(),
    canSlide:false,
    title:'Detalii participantii',
    iconClass:'icon mdi mdi-account-group',
};

const eventReducer = (state: any = initialCreateEventState, action: any) => {
    switch (action.type) {
        case ReduxCommonActionType.CreateEventState:
            return {
                ...state,
                currentSlide: action.result.currentSlide,
                title:action.result.title,
                iconClass:action.result.iconClass,
            };
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
