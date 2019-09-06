import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';

class GetUserCommandController implements ICommand<any, Promise<UserViewModel>> {
    public async execute(userId: any): Promise<UserViewModel> {
        return await UserRepository.Get(userId);
    }
}

export const GetUserCommand = new GetUserCommandController();
