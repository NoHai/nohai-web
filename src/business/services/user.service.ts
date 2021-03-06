import { IUserService } from '../../contracts/services/user-service.interface';
import { ResultModel, UserModel } from '../../contracts/models';
import {
  GetUserCommand,
  CreateUserCommand,
  UpdateUserCommand,
  DeleteUserCommand,
  RecoveryPasswordCommand,
} from '../commands/user';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import { ResetPasswordCommand } from '../commands/user/reset-password.command';
import { ActivateUserCommand } from '../commands/user/activate-user.command';
import { ResendActivationEmailCommand } from '../commands/user/resend-activation-email.command';

class UserServiceController implements IUserService {
  public async Get(): Promise<UserViewModel> {
    return await GetUserCommand.execute();
  }

  public async Create(user: UserViewModel): Promise<UserViewModel> {
    return await CreateUserCommand.execute(user);
  }

  public async Update(user: UserViewModel): Promise<UserViewModel> {
    return await UpdateUserCommand.execute(user);
  }

  public async Delete(id: any): Promise<ResultModel<boolean>> {
    return await DeleteUserCommand.execute(id);
  }

  public async RecoveryPassword(email: any): Promise<string> {
    return await RecoveryPasswordCommand.execute(email);
  }

  public async ResetPassword(user: UserModel): Promise<boolean> {
    return await ResetPasswordCommand.execute(user);
  }

  public async ActivateUser(email: string): Promise<boolean> {
    return await ActivateUserCommand.execute(email);
  }

  public async ResendActivationEmail(email: string): Promise<boolean>{
    return await ResendActivationEmailCommand.execute(email);
  }
}

export const UserService = new UserServiceController();
