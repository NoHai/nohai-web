import { IUserRepository } from '../../contracts/repositories/user-repository.interface';
import { ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import MapModelHelper from '../../helpers/map-model.helper';

class UserRepositoryController implements IUserRepository {
    public async Get(id: any): Promise<UserViewModel> {

        const variables: any = {id: id};
        const query = gql`
            query usersDetails($id: String!){
             getUserById(id: $id) {
                    id
                    firstName
                    lastName
                    dateOfBirth
                    height
                    weight
                    picture
                }
            }
        `;

        const results: any = await GraphqlClient.queryWithVariables(query, variables);
        return MapModelHelper.MapUser(results.getUserById) ;
    }

    public Create(data: UserViewModel): Promise<UserViewModel> {
        throw new Error('Method not implemented.');
    }

    public async Update(userDetails: UserViewModel): Promise<UserViewModel> {
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
        const user = new UserViewModel();
        user.user.Id = result.updateUser.id;
        return user;
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const UserRepository = new UserRepositoryController();
