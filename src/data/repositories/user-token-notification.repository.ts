import { ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { TokenNotificationModel } from '../../contracts/models/token-notification.model';
import { IUserTokenNotificationRepository } from '../../contracts/repositories/user-token-notification.repository.interface';

class UserTokenNotificationRepositoryController implements IUserTokenNotificationRepository {
  public async Get(userId: any): Promise<TokenNotificationModel> {
    const query = gql`
            {
                userTokens(id: ${userId}) {
                    id,
                    userId,
                    token
                }
            }
        `;

    const results: any = await GraphqlClient.query(query);
    return results.users;
  }

  public async CreateToken(token: any): Promise<TokenNotificationModel> {
    let notificationToken: any = { token: token };

    const createNotificationTokenMutation = gql`
      mutation createNotificationTokenMutation($token: String!) {
        createNotificationToken(token: $token) {
          id
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(
      createNotificationTokenMutation,
      notificationToken
    );
    return result && result.createNotificationToken ? result.createNotificationToken.id : null;
  }

  public async Update(userToken: TokenNotificationModel): Promise<TokenNotificationModel> {
    throw new Error('Method not implemented.');
  }

  public async Delete(id: any): Promise<ResultModel<boolean>> {
    if (id) {
      let notificationToken: any = { id: id };

      const deleteNotificationTokenMutation = gql`
        mutation deleteNotificationTokenMutation($id: String!) {
          deleteNotificationToken(id: $id)
        }
      `;

      const result: any = await GraphqlClient.mutate(
        deleteNotificationTokenMutation,
        notificationToken
      );
      return result;
    } else {
      return new ResultModel<boolean>();
    }
  }

  Create(data: TokenNotificationModel): Promise<TokenNotificationModel> {
    throw new Error('Method not implemented.');
  }
}

export const UserTokenNotificationRepository = new UserTokenNotificationRepositoryController();
