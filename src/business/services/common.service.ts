import { ICommonService } from '../../contracts/services/common-service.interface';
import { ListModel } from '../../contracts/models';
import { SportModel } from '../../contracts/models/sport.model';
import { GetSportsCommand } from '../commands/common/get-sports.command';

class CommonServiceController implements ICommonService {
  async Get(): Promise<ListModel<SportModel>> {
    return await GetSportsCommand.execute();
  }
}

export const CommonService = new CommonServiceController();
