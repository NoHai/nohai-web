import {  ActionButtonType } from "../../contracts/enums/common";

export interface NotificationCardProps {
    id: any;
    title: string;
    body: string;
    actionType: number;
    avatarUrl:string;
    eventId:string
    onButtonClick?: (action: ActionButtonType, eventId: any, ...args: any[]) => void;
}