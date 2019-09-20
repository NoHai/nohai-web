import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';
import { ResultModel } from '../../../contracts/models';

class RecoveryPasswordCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
    public async execute(email:any): Promise<ResultModel<boolean>> {
        return await UserRepository.RecoveryPassword(email);
    }
}

export const RecoveryPasswordCommand = new RecoveryPasswordCommandController();
