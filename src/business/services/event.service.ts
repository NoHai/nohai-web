import { IEventService } from '../../contracts/services/event-service.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import { ListModel, EventModel, ResultModel } from '../../contracts/models';
import {
    FindEventCommand,
    GetEventCommand,
    CreateEventCommand,
    UpdateEventCommand,
    DeleteEventCommand,
} from '../commands/event';

class EventServiceController implements IEventService {
    public async Find(request: FindEventRequest): Promise<ListModel<EventModel>> {
        return await FindEventCommand.execute(request);
    }

    public async Get(id: any): Promise<EventModel> {
        return await GetEventCommand.execute(id);
    }

    public async Create(event: EventModel): Promise<EventModel> {
        return await CreateEventCommand.execute(event);
    }

    public async Update(event: EventModel): Promise<EventModel> {
        return await UpdateEventCommand.execute(event);
    }

    public async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteEventCommand.execute(id);
    }
}

export const EventService = new EventServiceController();
