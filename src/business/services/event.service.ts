import { IEventService } from '../../contracts/services/event-service.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import { ListModel, ResultModel, EventDetailsViewModel } from '../../contracts/models';
import {
    FindEventCommand,
    GetEventCommand,
    CreateEventCommand,
    UpdateEventCommand,
    DeleteEventCommand,
} from '../commands/event';

class EventServiceController implements IEventService {
    public async Find(request: FindEventRequest): Promise<ListModel<EventDetailsViewModel>> {
        return await FindEventCommand.execute(request);
    }

    public async Get(id: any): Promise<EventDetailsViewModel> {
        return await GetEventCommand.execute(id);
    }

    public async Create(model: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        const result = await CreateEventCommand.execute(model);
        return result;
    }

    public async Update(event: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        return await UpdateEventCommand.execute(event);
    }

    public async Delete(id: any): Promise<ResultModel<boolean>> {
        return await DeleteEventCommand.execute(id);
    }
}

export const EventService = new EventServiceController();
