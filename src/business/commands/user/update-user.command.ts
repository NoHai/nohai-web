import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { UserRepository } from '../../../data/repositories';

class UpdateUserCommandController implements ICommand<UserModel, Promise<UserModel>> {
    public async execute(user: UserModel): Promise<UserModel> {
        return await UserRepository.Update(user);
    }
}

export const UpdateUserCommand = new UpdateUserCommandController();
