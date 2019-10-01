import { ICommand } from '../command.interface';
import { EventDetailsViewModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class UpdateEventCommandController
  implements ICommand<EventDetailsViewModel, Promise<EventDetailsViewModel>> {
  public async execute(event: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    return await EventRepository.Update(event);
  }
}

export const UpdateEventCommand = new UpdateEventCommandController();
