import { ReduxCommonActionType } from "../../contracts/enums/actions";


export const unReadNotification = (unReadNorification: any) => {
    return {
        type: ReduxCommonActionType.UnReadNotification,
        result: unReadNorification,
    };
};

export const newNotificationReceived = (index:number) => {
    return {
        type: ReduxCommonActionType.NewNotificationReceived,
        result: index,
    };
};