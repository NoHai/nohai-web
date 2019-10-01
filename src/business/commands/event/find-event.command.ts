import { ICommand } from '../command.interface';
import { FindEventRequest } from '../../../contracts/requests/find-event.request';
import { ListModel, EventDetailsViewModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class FindEventCommandController
  implements ICommand<FindEventRequest, Promise<ListModel<EventDetailsViewModel>>> {
  public async execute(request: FindEventRequest): Promise<ListModel<EventDetailsViewModel>> {
    return await EventRepository.Find(request);
  }
}

export const FindEventCommand = new FindEventCommandController();
