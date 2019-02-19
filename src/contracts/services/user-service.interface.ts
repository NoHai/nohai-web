import { IService } from './service.interface';
import { UserModel } from '../models';

export interface IUserService extends IService<UserModel> {}
