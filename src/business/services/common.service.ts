import { ICommonService } from '../../contracts/services/common-service.interface';
import { ListModel } from '../../contracts/models';
import { SportModel } from '../../contracts/models/sport.model';
import { GetSportsCommand } from '../commands/common/get-sports.command';
import { GetCitiesCommand } from '../commands/common/get-cities.command';
import { GetCountiesCommand } from '../commands/common/get-counties.command';

class CommonServiceController implements ICommonService {
  async GetSports(): Promise<ListModel<SportModel>> {
    return await GetSportsCommand.execute();
  }
  async GetCities(): Promise<Array<any>> {
    return await GetCitiesCommand.execute();
  }
  async GetCounties(): Promise<Array<any>> {
    return await GetCountiesCommand.execute();
  }
}

export const CommonService = new CommonServiceController();
