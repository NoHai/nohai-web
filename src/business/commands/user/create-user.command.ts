import { ICommand } from '../command.interface';
import { UserModel } from '../../models';

export class CreateUserCommand implements ICommand<UserModel, UserModel> {
    execute(user: UserModel): UserModel {
        throw new Error("Method not implemented.");
    }
}
