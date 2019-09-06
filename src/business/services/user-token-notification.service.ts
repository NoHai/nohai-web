import { ResultModel } from '../../contracts/models';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import { TokenNotificationModel } from '../../contracts/models/token-notification.model';
import { IUserTokenNotificationService } from '../../contracts/services/user-token-notification.service.interface';
import { GetUserTokenNotificationCommand, CreateUserTokenNotificationCommand, UpdateUserTokenNotificationCommand, DeleteUserTokenNotificationCommand } from '../commands/user-token-notification';


class UserTokenNotificationServiceController implements IUserTokenNotificationService {
    public async Get(id: any): Promise<TokenNotificationModel> {
        return await GetUserTokenNotificationCommand.execute(id);
    }

    public async Create(userToken: TokenNotificationModel): Promise<TokenNotificationModel> {
        return await CreateUserTokenNotificationCommand.execute(userToken);
    }

    public async Update(user: UserViewModel): Promise<TokenNotificationModel> {
        return await UpdateUserTokenNotificationCommand.execute(user);
    }

    public async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteUserTokenNotificationCommand.execute(id);
    }
}

export const UserTokenNotificationService = new UserTokenNotificationServiceController();