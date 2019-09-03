import { IService } from './service.interface';
import { NotificationModel } from '../models/notification.model';

export interface INotificationService extends IService<NotificationModel> {}
