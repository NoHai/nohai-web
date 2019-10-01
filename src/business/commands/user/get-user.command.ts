import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';
import { UserViewModel } from '../../../contracts/view-models/user-view.model';

class GetUserCommandController implements ICommand<any, Promise<UserViewModel>> {
  public async execute(): Promise<UserViewModel> {
    return await UserRepository.Get();
  }
}

export const GetUserCommand = new GetUserCommandController();
