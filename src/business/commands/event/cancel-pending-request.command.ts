import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class CancelPendingRequestCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(eventId: any): Promise<ResultModel<boolean>> {
    return await EventRepository.CancelPendingRequest(eventId);
  }
}

export const CancelPendingRequestCommand = new CancelPendingRequestCommandController();
