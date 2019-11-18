import { IRepository } from './repository.interface';
import { UserViewModel } from '../view-models/user-view.model';
import { ResultModel } from '../models';

export interface IUserRepository extends IRepository<UserViewModel> {
    Activate(email: string): Promise<boolean>;
}
