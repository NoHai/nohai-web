import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class LeaveEventCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(notificationId: any): Promise<ResultModel<boolean>> {
    return await EventRepository.Leave(notificationId);
  }
}

export const LeaveEventCommand = new LeaveEventCommandController();
