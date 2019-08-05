import { ReduxCommonActionType } from "../../contracts/enums/actions";

export const changeEventDetails = (eventDetails: any) => {
    return {
        type: ReduxCommonActionType.ChangeEventDetails,
        result: eventDetails,
    };
};