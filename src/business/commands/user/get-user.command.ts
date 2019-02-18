import { ICommand } from '../command.interface';
import { UserModel } from '../../models';

export class GetUserCommand implements ICommand<any, UserModel> {
    execute(userId: any): UserModel {
        throw new Error('Method not implemented.');
    }
}
