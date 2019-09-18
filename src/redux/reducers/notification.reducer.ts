import { ReduxCommonActionType } from '../../contracts/enums/actions';

export const initialnNtificationReducerState = {
    unReadNotifications: 0,
};

const notificationReducer = (state: any = initialnNtificationReducerState, action: any) => {
    switch (action.type) {
        case ReduxCommonActionType.UnReadNotification:
            return {
                ...state,
                unReadNotifications: action.result
            };
        case ReduxCommonActionType.NewNotificationReceived:
            return {
                ...state,
                unReadNotifications: initialnNtificationReducerState.unReadNotifications + 1
            };
        default:
            return state;
    }
};

export default notificationReducer;
