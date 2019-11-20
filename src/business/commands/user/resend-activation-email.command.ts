import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';

class ResendActivationEmailCommandController implements ICommand<string, Promise<boolean>> {
  public async execute(parameter: string): Promise<boolean> {
    return await UserRepository.ResendActivationEmail(parameter);
  }
}

export const ResendActivationEmailCommand = new ResendActivationEmailCommandController();
