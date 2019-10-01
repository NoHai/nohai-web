import { ICommand } from '../command.interface';
import { TokenNotificationModel } from '../../../contracts/models/token-notification.model';
import { UserTokenNotificationRepository } from '../../../data/repositories/user-token-notification.repository';

class GetUserTokenNotificationCommandController
  implements ICommand<any, Promise<TokenNotificationModel>> {
  public async execute(userId: any): Promise<TokenNotificationModel> {
    return await UserTokenNotificationRepository.Get(userId);
  }
}

export const GetUserTokenNotificationCommand = new GetUserTokenNotificationCommandController();
