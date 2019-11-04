import { EventDetailsViewModel } from '../../contracts/models';
import { ReduxEventDetailsActionType } from '../../contracts/enums/actions';

export const initialnEventDetailsReducerState = {
    eventDetails: new EventDetailsViewModel(),
};

const eventDetailsReducer = (state: any = initialnEventDetailsReducerState, action: any) => {
  switch (action.type) {
    case ReduxEventDetailsActionType.SetEventDetailsState:
      return {
        ...state,
        eventDetails: action.result,
      };
    default:
      return state;
  }
};

export default eventDetailsReducer;
