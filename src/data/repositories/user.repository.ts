import { IUserRepository } from '../../contracts/repositories/user-repository.interface';
import { UserModel, ResultModel } from '../../contracts/models';

class UserRepositoryController implements IUserRepository {
    public Get(id: any): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    public Create(data: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    public Update(data: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const UserRepository = new UserRepositoryController();
