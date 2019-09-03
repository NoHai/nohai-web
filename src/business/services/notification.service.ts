import { ResultModel } from '../../contracts/models';
import { INotificationService } from '../../contracts/services/notification-service.interface';
import { NotificationModel } from '../../contracts/models/notification.model';
import { GetNotificationsCommand, CreateNotificationCommand, UpdateNotificationCommand, DeleteNotificationCommand } from '../commands/notification';

class NotificationServiceController implements INotificationService {
    public async Get(id: any): Promise<NotificationModel> {
        return await GetNotificationsCommand.execute(id);
    }

    public async Create(notification: NotificationModel): Promise<NotificationModel> {
        return await CreateNotificationCommand.execute(notification);
    }

    public async Update(notification: NotificationModel): Promise<NotificationModel> {
        return await UpdateNotificationCommand.execute(notification);
    }

    public async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteNotificationCommand.execute(id);
    }
}

export const UserService = new NotificationServiceController();