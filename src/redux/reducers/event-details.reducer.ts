import { EventDetailsViewModel } from '../../contracts/models';
import { ReduxEventDetailsActionType } from '../../contracts/enums/actions';

export const initialnEventDetailsReducerState = {
  eventDetails: new EventDetailsViewModel(),
  showMembersModal: false,
};

const eventDetailsReducer = (state: any = initialnEventDetailsReducerState, action: any) => {
  switch (action.type) {
    case ReduxEventDetailsActionType.SetEventDetailsState:
      return {
        ...state,
        eventDetails: action.result,
        showMembersModal: state.showMembersModal,
      };

    case ReduxEventDetailsActionType.ShowMembersModalChange:
      return {
        ...state,
        eventDetails: state.eventDetails,
        showMembersModal: action.result,
      };
    case ReduxEventDetailsActionType.ResetEventDetails:
      return initialnEventDetailsReducerState;
    default:
      return state;
  }
};

export default eventDetailsReducer;
