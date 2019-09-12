import { ICommand } from '../command.interface';
import { UserModel, ListModel } from '../../../contracts/models';
import { SportModel } from '../../../contracts/models/sport.model';
import { CommonRepository } from '../../../data/repositories';

class GetSportsCommandController implements ICommand<UserModel, Promise<ListModel<SportModel>>> {
    public async execute(): Promise<ListModel<SportModel>> {
        return await CommonRepository.Get();
    }
}

export const GetSportsCommand = new GetSportsCommandController();
