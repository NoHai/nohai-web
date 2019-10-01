import { ICommand } from '../command.interface';
import { NotificationRepository } from '../../../data/repositories/notification.repository';
import { ResultModel } from '../../../contracts/models';

class MarkAllAsReadCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(): Promise<ResultModel<boolean>> {
    return await NotificationRepository.MarkAllAsRead();
  }
}

export const MarkAllAsReadCommand = new MarkAllAsReadCommandController();
