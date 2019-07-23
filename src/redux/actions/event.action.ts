import { ReduxCommonActionType } from "../../contracts/enums/actions";

export const changeCreateEventSlide = (slideIndex: number, title:string, iconClass:string) => {
    const result = {
        currentSlide: slideIndex,
        title: title,
        iconClass: iconClass,
    }
    return {
        type: ReduxCommonActionType.CreateEventState,
        result:result,
    };
};

export const changeEventDetails = (eventDetails: any) => {
    return {
        type: ReduxCommonActionType.ChangeEventDetails,
        result: eventDetails,
    };
};