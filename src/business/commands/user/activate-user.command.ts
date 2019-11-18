import { ICommand } from '../command.interface';
import { UserRepository } from '../../../data/repositories';

class ActivateUserCommandController implements ICommand<string, Promise<boolean>> {
  public async execute(paremeter: string): Promise<boolean> {
    return await UserRepository.Activate(paremeter);
  }
}

export const ActivateUserCommand = new ActivateUserCommandController();
