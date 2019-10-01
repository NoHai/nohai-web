import { ResultModel } from '../models';

export interface IService<T> {
  Get(id: any): Promise<T>;
  Create(data: T): Promise<T>;
  Update(data: any): Promise<T>;
  Delete(id: any): Promise<ResultModel<boolean>>;
}
