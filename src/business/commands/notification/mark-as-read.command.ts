import { ICommand } from '../command.interface';
import { NotificationRepository } from '../../../data/repositories/notification.repository';
import { ResultModel } from '../../../contracts/models';

class MarkAsReadCommandController implements ICommand<any, Promise<ResultModel<string>>> {
  public async execute(id: string): Promise<ResultModel<string>> {
    return await NotificationRepository.MarkAsRead(id);
  }
}

export const MarkAsReadCommand = new MarkAsReadCommandController();
