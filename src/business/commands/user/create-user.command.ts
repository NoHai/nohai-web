import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { UserRepository } from '../../../data/repositories';

class CreateUserCommandController implements ICommand<UserModel, Promise<UserModel>> {
    public async execute(user: UserModel): Promise<UserModel> {
        return await UserRepository.Create(user);
    }
}

export const CreateUserCommand = new CreateUserCommandController();
