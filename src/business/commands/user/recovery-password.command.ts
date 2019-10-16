import { ICommand } from '../command.interface';
import { AuthRepository } from '../../../data/repositories';

class RecoveryPasswordCommandController implements ICommand<any, Promise<string>> {
  public async execute(email: string): Promise<string> {
    return await AuthRepository.recoveryPassword(email);
  }
}

export const RecoveryPasswordCommand = new RecoveryPasswordCommandController();
