import { ResultModel, ListModel } from '../../contracts/models';
import { INotificationService } from '../../contracts/services/notification-service.interface';
import { NotificationModel } from '../../contracts/models/notification.model';
import { GetNotificationsCommand, CreateNotificationCommand, UpdateNotificationCommand, DeleteNotificationCommand } from '../commands/notification';
import { FindNotificationsCommand } from '../commands/notification/find-notifications.command';

class NotificationServiceController implements INotificationService {

    public async Find(request: any): Promise<ListModel<NotificationModel>> {
        return await FindNotificationsCommand.execute(request);
    }
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

export const NotificationService = new NotificationServiceController();