import { ICommand } from '../command.interface';
import { ResultModel } from '../../../contracts/models';
import { EventRepository } from '../../../data/repositories/event.respository';

class KickoutParticipantCommandController implements ICommand<any, Promise<ResultModel<boolean>>> {
  public async execute(data: any): Promise<ResultModel<boolean>> {
    return await EventRepository.KickoutParticipant(data);
  }
}

export const KickoutParticipantCommand = new KickoutParticipantCommandController();
