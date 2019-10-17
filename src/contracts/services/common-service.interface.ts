import { SportModel } from '../models/sport.model';
import { ListModel } from '../models';

export interface ICommonService {
  GetSports(): Promise<ListModel<SportModel>>;
}
