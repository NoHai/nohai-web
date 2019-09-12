import { ListModel, EventDetailsViewModel, ResultModel } from '../models';
import { IRepository } from './repository.interface';
import { FindEventRequest } from '../requests/find-event.request';

export interface IEventRepository extends IRepository<EventDetailsViewModel> {
    Find(data: FindEventRequest): Promise<ListModel<EventDetailsViewModel>>;
    Join(eventId: any): Promise<ResultModel<boolean>>
}
