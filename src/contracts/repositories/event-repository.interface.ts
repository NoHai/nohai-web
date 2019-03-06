import { EventModel, ListModel } from '../models';
import { IRepository } from './repository.interface';
import { FindEventRequest } from '../requests/find-event.request';

export interface IEventRepository extends IRepository<EventModel> {
    Find(data: FindEventRequest): Promise<ListModel<EventModel>>;
}