import { IUserRepository } from '../../contracts/repositories/user-repository.interface';
import { UserModel, ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { UserViewModel } from '../../contracts/models/user-view.model';

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

    public async Update(userDetails: UserViewModel): Promise<UserModel> {
        let input: any =  { details: 
            {
                id: userDetails.user.Id,
                firstName: userDetails.user.FirstName,
                lastName: userDetails.user.LastName,
                dateOfBirth: userDetails.details.Day + "/" + userDetails.details.Month + "/" + userDetails.details.Year,
                height: +userDetails.details.Height,
                weight: +userDetails.details.Weight
            }
        };

        const updateMutation = gql`
            mutation userUpdateMutation($details: UpdateUserInput!) {
                updateUser(input: $details) {
                    id
            }}`;

        const result: any = await GraphqlClient.mutate(updateMutation, input);
        const user = new UserModel();
        user.Id = result.updateUser.id;
        return user;
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const UserRepository = new UserRepositoryController();
