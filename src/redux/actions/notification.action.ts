import { ReduxCommonActionType } from "../../contracts/enums/actions";


export const unReadNotification = (unReadNorification: any) => {
    return {
        type: ReduxCommonActionType.UnReadNotification,
        result: unReadNorification,
    };
};

export const newNotificationReceived = () => {
    return {
        type: ReduxCommonActionType.NewNotificationReceived,
        result: 1,
    };
};