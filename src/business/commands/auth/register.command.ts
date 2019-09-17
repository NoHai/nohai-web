import { ICommand } from "../command.interface";
import { RegisterViewModel } from "../../../contracts/view-models";
import { AuthRepository } from "../../../data/repositories";
import { Token } from '../../../contracts/models/auth';

class RegisterCommandController implements ICommand<RegisterViewModel, Promise<Token>>{
    public async execute(value: RegisterViewModel): Promise<Token> {
        return await AuthRepository.register(value);
    }
}

export const RegisterCommand = new RegisterCommandController();