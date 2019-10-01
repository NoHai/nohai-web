import { ICommand } from '../command.interface';
import { EventDetailsViewModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class GetEventCommandController implements ICommand<any, Promise<EventDetailsViewModel>> {
  public async execute(id: any): Promise<EventDetailsViewModel> {
    return await EventRepository.Get(id);
  }
}

export const GetEventCommand = new GetEventCommandController();
