import { ResultModel, ListModel } from '../../contracts/models';
import { INotificationService } from '../../contracts/services/notification-service.interface';
import { NotificationModel } from '../../contracts/models/notification.model';
import { GetNotificationsCommand, CreateNotificationCommand, UpdateNotificationCommand, DeleteNotificationCommand } from '../commands/notification';
import { FindNotificationsCommand } from '../commands/notification/find-notifications.command';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';
import { MarkAllAsReadCommand } from '../commands/notification/mark-all-as-read.command';
import { MarkAsReadCommand } from '../commands/notification/mark-as-read.command';

class NotificationServiceController implements INotificationService {

    public async Find(request: PaginationBaseRequestModel): Promise<ListModel<NotificationModel>> {
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

    public async MarkAllAsRead(): Promise<ResultModel<boolean>> {
        return await MarkAllAsReadCommand.execute();
    }
    public async MarkAsRead(id:string): Promise<ResultModel<string>> {
        return await MarkAsReadCommand.execute(id);
    }
}

export const NotificationService = new NotificationServiceController();