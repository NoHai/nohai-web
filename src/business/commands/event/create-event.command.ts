import { ICommand } from '../command.interface';
import { EventModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class CreateEventCommandController implements ICommand<EventModel, Promise<EventModel>> {
    public async execute(event: EventModel): Promise<EventModel> {
        return await EventRepository.Create(event);
    }
}

export const CreateEventCommand = new CreateEventCommandController();
