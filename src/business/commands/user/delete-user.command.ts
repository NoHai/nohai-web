import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { UserRepository } from '../../../data/repositories';

class DeleteUserCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(userId: any): Promise<ResultModel<boolean>> {
    return await UserRepository.Delete(userId);
  }
}

export const DeleteUserCommand = new DeleteUserCommandController();
