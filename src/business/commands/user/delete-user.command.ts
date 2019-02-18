import { ICommand } from '../command.interface';
import { ResultModel } from '../../models/common';

export class DeleteUserCommand implements ICommand<any, ResultModel<boolean>> {
    execute(userId: any): ResultModel<boolean> {
        throw new Error('Method not implemented.');
    }
}
