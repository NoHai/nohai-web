import { ResultModel } from '../models';

export interface IRepository<T> {
    Get(id: any): Promise<T>;
    Create(data: T): Promise<T>;
    Update(data: T): Promise<T>;
    Delete(data: any): Promise<ResultModel<boolean>>;
}
