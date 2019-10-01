import { ICommand } from '../command.interface';
import { AuthRepository } from '../../../data/repositories';
import { Token } from '../../../contracts/models/auth';

class RefreshTokenCommandController implements ICommand<string, Promise<Token>> {
  public async execute(newToken: string): Promise<Token> {
    return await AuthRepository.refreshToken(newToken);
  }
}

export const RefreshTokenCommand = new RefreshTokenCommandController();
