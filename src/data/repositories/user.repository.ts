import { IUserRepository } from '../../contracts/repositories/user-repository.interface';
import { UserModel, ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';

class UserRepositoryController implements IUserRepository {
    public async Get(id: any): Promise<UserModel> {
        const query = gql`
            {
                users(id: ${id}) {
                    id,
                    firstName,
                    lastName
                }
            }
        `;

        const results: any = await GraphqlClient.query(query);
        return results.users;
    }

    public Create(data: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    public Update(data: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const UserRepository = new UserRepositoryController();
