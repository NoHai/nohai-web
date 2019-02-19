import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class DeleteEventCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
    public async execute(id: any): Promise<ResultModel<boolean>> {
        return await EventRepository.Delete(id);
    }
}

export const DeleteEventCommand = new DeleteEventCommandController();
