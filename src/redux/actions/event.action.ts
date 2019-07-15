import { ReduxCommonActionType } from "../../contracts/enums/actions";

export const changeCreateEventSlide = (slideIndex: number) => {
    const result = {
        currentSlide: slideIndex,
    }

    return {
        type: ReduxCommonActionType.CreateEventState,
        result,
    };
};

export const changeEventDetails = (model: any) => {
    const result = {
        eventDetails: model,
    }

    return {
        type: ReduxCommonActionType.ChangeEventDetails,
        result,
    };
};