import { IRepository } from './repository.interface';
import { UserViewModel } from '../view-models/user-view.model';

export interface IUserRepository extends IRepository<UserViewModel> {
 
}
