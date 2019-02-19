import { ICommand } from '../command.interface';
import { EventModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class UpdateEventCommandController implements ICommand<EventModel, Promise<EventModel>> {
    public async execute(event: EventModel): Promise<EventModel> {
        return await EventRepository.Update(event);
    }
}

export const UpdateEventCommand = new UpdateEventCommandController();
