import { ICommand } from '../command.interface';
import { UserModel } from '../../../contracts/models';
import { UserRepository } from '../../../data/repositories';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';

class UpdateUserCommandController implements ICommand<UserViewModel, Promise<UserModel>> {
    public async execute(user: UserViewModel): Promise<UserModel> {
        return await UserRepository.Update(user);
    }
}

export const UpdateUserCommand = new UpdateUserCommandController();
