import { ReduxEventDetailsActionType } from "../../contracts/enums/actions";
import { EventService } from "../../business/services";

export const setEventDetailsState = (eventDetailsState: any) => {
  return {
    type: ReduxEventDetailsActionType.SetEventDetailsState,
    result: eventDetailsState,
  };
};

export const getEventDetails = (id: string,) => {
    return (dispatch: any) => {
      EventService.Get(id)
        .then(eventDetailsDispatch(dispatch));
    };
  };

  function eventDetailsDispatch(dispatch: any): (value: any) => void {
    return result => {
      dispatch(setEventDetailsState(result));
    };
  }
  

