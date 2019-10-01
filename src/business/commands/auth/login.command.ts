import { ICommand } from '../command.interface';
import { LoginViewModel } from '../../../contracts/view-models';
import { AuthRepository } from '../../../data/repositories';
import { Token } from '../../../contracts/models/auth';

class LoginCommandController implements ICommand<LoginViewModel, Promise<Token>> {
  public async execute(value: LoginViewModel): Promise<Token> {
    return await AuthRepository.login(value);
  }
}

export const LoginCommand = new LoginCommandController();
