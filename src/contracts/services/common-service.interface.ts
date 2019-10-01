import { SportModel } from '../models/sport.model';
import { ListModel } from '../models';

export interface ICommonService {
  Get(): Promise<ListModel<SportModel>>;
}
