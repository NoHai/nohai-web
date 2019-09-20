import { IRepository } from './repository.interface';
import { NotificationModel } from '../models/notification.model';
import { ListModel, ResultModel } from '../models';

export interface INotificationRepository extends IRepository<NotificationModel> {
    Find(data: any): Promise<ListModel<NotificationModel>>;
    MarkAllAsRead(data: any): Promise<ResultModel<boolean>>;
    MarkAsRead(id: string): Promise<ResultModel<string>>;
}
