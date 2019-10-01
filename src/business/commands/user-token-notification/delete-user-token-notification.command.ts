import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { UserTokenNotificationRepository } from '../../../data/repositories/user-token-notification.repository';

class DeleteUserTokenNotificationCommandController
  implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(userTokenNotification: any): Promise<ResultModel<boolean>> {
    return await UserTokenNotificationRepository.Delete(userTokenNotification);
  }
}

export const DeleteUserTokenNotificationCommand = new DeleteUserTokenNotificationCommandController();
