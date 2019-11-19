import { IRepository } from './repository.interface';
import { UserViewModel } from '../view-models/user-view.model';

export interface IUserRepository extends IRepository<UserViewModel> {
    Activate(email: string): Promise<boolean>;
    ResendActivationEmail(email: string): Promise<boolean>;
}
