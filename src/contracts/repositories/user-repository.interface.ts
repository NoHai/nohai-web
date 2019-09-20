import { IRepository } from './repository.interface';
import { UserViewModel } from '../view-models/user-view.model';
import { ResultModel, UserModel } from '../models';

export interface IUserRepository extends IRepository<UserViewModel> {
    RecoveryPassword(email: any): Promise<ResultModel<boolean>>
    ResetPassword(user: UserModel): Promise<ResultModel<boolean>>
}
