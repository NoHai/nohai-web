import { ICommand } from '../command.interface';
import { NotificationModel } from '../../../contracts/models/notification.model';
import { NotificationRepository } from '../../../data/repositories/notification.repository';

class GetNotificationsCommandController implements ICommand<any, Promise<NotificationModel>> {
  public async execute(userId: any): Promise<NotificationModel> {
    return await NotificationRepository.Get(userId);
  }
}

export const GetNotificationsCommand = new GetNotificationsCommandController();
