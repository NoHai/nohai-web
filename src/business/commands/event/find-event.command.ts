import { ICommand } from '../command.interface';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { EventModel, ListModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class FindEventCommandController
    implements ICommand<FindEventRequest, Promise<ListModel<EventModel>>> {
    public async execute(request: FindEventRequest): Promise<ListModel<EventModel>> {
        return await EventRepository.Find(request);
    }
}

export const FindEventCommand = new FindEventCommandController();
