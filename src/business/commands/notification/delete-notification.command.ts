import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { NotificationRepository } from '../../../data/repositories/notification.repository';

class DeleteNotificationCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
    public async execute(notification: any): Promise<ResultModel<boolean>> {
        return await NotificationRepository.Delete(notification);
    }
}

export const DeleteNotificationCommand = new DeleteNotificationCommandController();
