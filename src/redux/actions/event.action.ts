import { ReduxCommonActionType } from "../../contracts/enums/actions";

export const changeCreateEventSlide = (slideIndex: number) => {
    return {
        type: ReduxCommonActionType.CreateEventState,
        result:slideIndex,
    };
};

export const changeEventDetails = (eventDetails: any) => {
    return {
        type: ReduxCommonActionType.ChangeEventDetails,
        result: eventDetails,
    };
};