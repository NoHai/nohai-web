import { ICommand } from '../command.interface';
import { NotificationModel } from '../../../contracts/models/notification.model';
import { NotificationRepository } from '../../../data/repositories/notification.repository';
import { ListModel } from '../../../contracts/models';

class FindNotificationsCommandController implements ICommand<any, Promise<ListModel<NotificationModel>>> {
    public async execute(userId: any): Promise<ListModel<NotificationModel>> {
        return await NotificationRepository.Find(userId);
    }
}

export const FindNotificationsCommand = new FindNotificationsCommandController();