import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';

class UpdateUserCommandController implements ICommand<UserViewModel, Promise<UserViewModel>> {
    public async execute(user: UserViewModel): Promise<UserViewModel> {
        return await UserRepository.Update(user);
    }
}

export const UpdateUserCommand = new UpdateUserCommandController();
