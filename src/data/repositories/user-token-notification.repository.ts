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

    public async Create(userToken: TokenNotificationModel): Promise<TokenNotificationModel> {
        let input: any = {
            notificationToken:
            {
                userId:'7c2bac31-896e-481b-9c45-eb32e80f712e',
                token:userToken.Token
            }
        };

        const createNotificationTokenMutation = gql`
            mutation createNotificationTokenMutation($notificationToken: NotificationTokenInput!) {
                createNotificationToken(input: $notificationToken) {
                    id
            }}`;

        const result: any = await GraphqlClient.mutate(createNotificationTokenMutation, input);
        return result.createNotificationToken.id;
          
    }
    

    public async Update(userToken: TokenNotificationModel): Promise<TokenNotificationModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const UserTokenNotificationRepository = new UserTokenNotificationRepositoryController();
