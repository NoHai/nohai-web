import { UserModel, EventModel } from "../../contracts/models";
import { ActionType } from "../../contracts/enums/common";

export interface NotificationCardProps {
    id: any;
    user: UserModel;
    event: EventModel;
    actionType: ActionType;
}