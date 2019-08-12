import { IUserService } from '../../contracts/services/user-service.interface';
import { UserModel, ResultModel } from '../../contracts/models';
import {
    GetUserCommand,
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
} from '../commands/user';
import { UserViewModel } from '../../contracts/view-models/user-view.model';

class UserServiceController implements IUserService {
    public async Get(id: any): Promise<UserModel> {
        return await GetUserCommand.execute(id);
    }

    public async Create(user: UserModel): Promise<UserModel> {
        return await CreateUserCommand.execute(user);
    }

    public async Update(user: UserViewModel): Promise<UserModel> {
        return await UpdateUserCommand.execute(user);
    }

    public async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteUserCommand.execute(id);
    }
}

export const UserService = new UserServiceController();
