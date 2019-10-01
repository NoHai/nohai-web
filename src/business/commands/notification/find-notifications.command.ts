import { ICommand } from '../command.interface';
import { NotificationModel } from '../../../contracts/models/notification.model';
import { NotificationRepository } from '../../../data/repositories/notification.repository';
import { ListModel } from '../../../contracts/models';
import { PaginationBaseRequestModel } from '../../../contracts/requests/pagination.base.model.request';

class FindNotificationsCommandController
  implements ICommand<any, Promise<ListModel<NotificationModel>>> {
  public async execute(request: PaginationBaseRequestModel): Promise<ListModel<NotificationModel>> {
    return await NotificationRepository.Find(request);
  }
}

export const FindNotificationsCommand = new FindNotificationsCommandController();
