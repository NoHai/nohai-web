import { IService } from './service.interface';
import { EventModel, ListModel } from '../models';
import { FindEventRequest } from '../requests/find-event.request';

export interface IEventService extends IService<EventModel> {
    Find(request: FindEventRequest): Promise<ListModel<EventModel>>;
}
