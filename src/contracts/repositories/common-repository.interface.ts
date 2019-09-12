import { SportModel } from "../models/sport.model";
import { ListModel } from "../models";

export interface ICommonRepository  {
    Get(): Promise<ListModel<SportModel>>;
}
