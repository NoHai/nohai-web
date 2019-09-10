import { ResultModel } from '../../contracts/models';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import { TokenNotificationModel } from '../../contracts/models/token-notification.model';
import { IUserTokenNotificationService } from '../../contracts/services/user-token-notification.service.interface';
import { GetUserTokenNotificationCommand, CreateUserTokenNotificationCommand, UpdateUserTokenNotificationCommand, DeleteUserTokenNotificationCommand } from '../commands/user-token-notification';


class UserTokenNotificationServiceController implements IUserTokenNotificationService {
   
    async Get(id: any): Promise<TokenNotificationModel> {
        return await GetUserTokenNotificationCommand.execute(id);
    }

    async CreateToken(userToken: any): Promise<TokenNotificationModel> {
        return await CreateUserTokenNotificationCommand.execute(userToken);
    }

    async Create(data: TokenNotificationModel): Promise<TokenNotificationModel> {
        throw new Error("Method not implemented.");
    }

    async Update(user: UserViewModel): Promise<TokenNotificationModel> {
        return await UpdateUserTokenNotificationCommand.execute(user);
    }

    async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteUserTokenNotificationCommand.execute(id);
    }
}

export const UserTokenNotificationService = new UserTokenNotificationServiceController();