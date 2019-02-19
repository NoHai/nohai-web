import { ICommand } from '../command.interface';
import { EventModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class GetEventCommandController implements ICommand<any, Promise<EventModel>> {
    public async execute(id: any): Promise<EventModel> {
        return await EventRepository.Get(id);
    }
}

export const GetEventCommand = new GetEventCommandController();
