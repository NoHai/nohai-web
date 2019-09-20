import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';
import { ResultModel, UserModel } from '../../../contracts/models';

class ResetPasswordCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
    public async execute(user:UserModel): Promise<ResultModel<boolean>> {
        return await UserRepository.ResetPassword(user);
    }
}

export const ResetPasswordCommand = new ResetPasswordCommandController();
