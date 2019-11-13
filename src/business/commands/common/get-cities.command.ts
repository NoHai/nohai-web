import { ICommand } from '../command.interface';
import { UserModel, ListModel } from '../../../contracts/models';
import { CommonRepository } from '../../../data/repositories';

class GetCitiesCommandController implements ICommand<UserModel, Promise<Array<any>>> {
  public async execute(): Promise<Array<any>> {
    return await CommonRepository.GetCities();
  }
}

export const GetCitiesCommand = new GetCitiesCommandController();
