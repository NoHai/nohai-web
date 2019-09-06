import { IService } from './service.interface';
import { ListModel, EventDetailsViewModel, ResultModel } from '../models';
import { FindEventRequest } from '../requests/find-event.request';

export interface IEventService extends IService<EventDetailsViewModel> {
    Find(request: FindEventRequest): Promise<ListModel<EventDetailsViewModel>>;
    Join(eventId: any): Promise<ResultModel<boolean>>;
}
