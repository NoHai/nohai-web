import { UserModel } from '../models';
import { IRepository } from './repository.interface';

export interface IUserRepository extends IRepository<UserModel> {}
