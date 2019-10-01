import { IUserRepository } from '../../contracts/repositories/user-repository.interface';
import { ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { UserViewModel } from '../../contracts/view-models/user-view.model';
import MapModelHelper from '../../helpers/map-model.helper';

class UserRepositoryController implements IUserRepository {
  public async Get(): Promise<UserViewModel> {
    const query = gql`
      query usersDetails {
        getUserById {
          id
          firstName
          lastName
          dateOfBirth
          height
          weight
          picture
          login
        }
      }
    `;

    const results: any = await GraphqlClient.query(query);
    return MapModelHelper.MapUser(results.getUserById);
  }

  public Create(data: UserViewModel): Promise<UserViewModel> {
    throw new Error('Method not implemented.');
  }

  public async Update(userDetails: UserViewModel): Promise<UserViewModel> {
    let input: any = {
      details: {
        firstName: userDetails.user.FirstName,
        lastName: userDetails.user.LastName,
        dateOfBirth: `${userDetails.details.Day}/${userDetails.details.Month}/${userDetails.details.Year}`,
        height: +userDetails.details.Height,
        weight: +userDetails.details.Weight,
        favoriteSport: userDetails.sport.Id,
      },
    };

    const updateMutation = gql`
      mutation userUpdateMutation($details: UpdateUserInput!) {
        updateUser(input: $details) {
          id
        }
      }
    `;

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
