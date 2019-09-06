import { IRepository } from './repository.interface';
import { NotificationModel } from '../models/notification.model';
import { ListModel } from '../models';

export interface INotificationRepository extends IRepository<NotificationModel> {
    Find(data: any): Promise<ListModel<NotificationModel>>;
}
