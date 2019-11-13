import { ICommand } from '../command.interface';
import { UserModel, ListModel } from '../../../contracts/models';
import { CommonRepository } from '../../../data/repositories';

class GetCountiesCommandController implements ICommand<UserModel, Promise<Array<any>>> {
  public async execute(): Promise<Array<any>> {
    return await CommonRepository.GetCounties();
  }
}

export const GetCountiesCommand = new GetCountiesCommandController();
