import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { NotificationModel } from '../../../contracts/models/notification.model';
import { NotificationRepository } from '../../../data/repositories/notification.repository';

class CreateNotificationCommandController
  implements ICommand<UserModel, Promise<NotificationModel>> {
  public async execute(userToken: any): Promise<NotificationModel> {
    return await NotificationRepository.Create(userToken);
  }
}

export const CreateNotificationCommand = new CreateNotificationCommandController();
