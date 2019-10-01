import { ICommand } from '../command.interface';
import { EventDetailsViewModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class CreateEventCommandController
  implements ICommand<EventDetailsViewModel, Promise<EventDetailsViewModel>> {
  public async execute(event: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    return await EventRepository.Create(event);
  }
}

export const CreateEventCommand = new CreateEventCommandController();
