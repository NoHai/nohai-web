import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class RejectRequestCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(notificationId: any): Promise<ResultModel<boolean>> {
    return await EventRepository.Reject(notificationId);
  }
}

export const RejectRequestCommand = new RejectRequestCommandController();
