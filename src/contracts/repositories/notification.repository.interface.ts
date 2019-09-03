import { IRepository } from './repository.interface';
import { NotificationModel } from '../models/notification.model';

export interface INotificationRepository extends IRepository<NotificationModel> {}
