import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { AuthRepository } from '../../../data/repositories';

class RecoveryPasswordCommandController implements ICommand<any, Promise<string>> {
    public async execute(email:any): Promise<string> {
        return await AuthRepository.recoveryPassword(email);
    }
}

export const RecoveryPasswordCommand = new RecoveryPasswordCommandController();
