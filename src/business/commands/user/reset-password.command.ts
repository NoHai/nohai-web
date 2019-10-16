import { ICommand } from '../command.interface';
import { AuthRepository } from '../../../data/repositories';
import { UserModel } from '../../../contracts/models';

class ResetPasswordCommandController implements ICommand<any, Promise<boolean>> {
  public async execute(user: UserModel): Promise<boolean> {
    return await AuthRepository.resetPassword(user);
  }
}

export const ResetPasswordCommand = new ResetPasswordCommandController();
