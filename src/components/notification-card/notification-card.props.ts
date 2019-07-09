import { UserModel, EventModel } from "../../contracts/models";
import { ActionType, ActionButtonType } from "../../contracts/enums/common";

export interface NotificationCardProps {
    id: any;
    user: UserModel;
    event: EventModel;
    actionType: ActionType;
    onButtonClick?: (action: ActionButtonType, id: any, ...args: any[]) => void;
}