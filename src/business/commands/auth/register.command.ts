import { ICommand } from '../command.interface';
import { RegisterViewModel } from '../../../contracts/view-models';
import { AuthRepository } from '../../../data/repositories';

class RegisterCommandController implements ICommand<RegisterViewModel, Promise<string>> {
  public async execute(value: RegisterViewModel): Promise<string> {
    return await AuthRepository.register(value);
  }
}

export const RegisterCommand = new RegisterCommandController();
