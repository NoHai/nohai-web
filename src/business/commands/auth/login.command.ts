import { ICommand } from '../command.interface';
import { LoginViewModel } from '../../../contracts/view-models';
import { AuthRepository } from '../../../data/repositories';

class LoginCommandController implements ICommand<LoginViewModel, Promise<string>> {
    public async execute(value: LoginViewModel): Promise<string> {
        return await AuthRepository.login(value);
    }
}

export const LoginCommand = new LoginCommandController();
