import { SportModel } from '../models/sport.model';
import { ListModel } from '../models';

export interface ICommonRepository {
  GetSports(): Promise<ListModel<SportModel>>;
}
