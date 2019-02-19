import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { UserRepository } from '../../../data/repositories';

class GetUserCommandController implements ICommand<any, Promise<UserModel>> {
    public async execute(userId: any): Promise<UserModel> {
        return await UserRepository.Get(userId);
    }
}

export const GetUserCommand = new GetUserCommandController();
