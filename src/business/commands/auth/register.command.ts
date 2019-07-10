import { ICommand } from "../command.interface";
import { RegisterViewModel } from "../../../contracts/view-models";
import { AuthRepository } from "../../../data/repositories";

class RegisterCommandController implements ICommand<RegisterViewModel, Promise<boolean>>{
    public async execute(value: RegisterViewModel): Promise<boolean> {
        return await AuthRepository.register(value);
    }


}

export const RegisterCommand = new RegisterCommandController();