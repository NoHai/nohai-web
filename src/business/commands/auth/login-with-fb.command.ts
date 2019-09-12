import { ICommand } from '../command.interface';
import { AuthRepository } from '../../../data/repositories';
import { Token } from '../../../contracts/models/auth';
import { UserModel } from '../../../contracts/models';

class LoginWithFbCommandController implements ICommand<UserModel, Promise<Token>> {
    public async execute(value: UserModel): Promise<Token> {
        return await AuthRepository.loginwithFb(value);
    }
}

export const LoginWithFbCommand = new LoginWithFbCommandController();
