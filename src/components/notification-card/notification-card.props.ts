import { ActionButtonType } from '../../contracts/enums/common';

export interface NotificationCardProps {
  id: any;
  title: string;
  body: string;
  actionType: number;
  avatarUrl: string;
  eventId: string;
  status: number;
  createdDate:string;
  onButtonClick?: (
    action: ActionButtonType,
    notificationId: any,
    eventId: any,
    ...args: any[]
  ) => void;
}
