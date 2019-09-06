import { IService } from './service.interface';
import { UserViewModel } from '../view-models/user-view.model';

export interface IUserService extends IService<UserViewModel> {}
