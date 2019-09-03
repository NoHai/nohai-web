import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { TokenNotificationModel } from '../../../contracts/models/token-notification.model';
import { UserTokenNotificationRepository } from '../../../data/repositories/user-token-notification.repository';

class CreateUserTokenNotificationCommandController implements ICommand<UserModel, Promise<TokenNotificationModel>> {
    public async execute(userToken: any): Promise<TokenNotificationModel> {
        return await UserTokenNotificationRepository.Create(userToken);
    }
}

export const CreateUserTokenNotificationCommand = new CreateUserTokenNotificationCommandController();
