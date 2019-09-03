import { ResultModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { INotificationRepository } from '../../contracts/repositories/notification.repository.interface';
import { NotificationModel } from '../../contracts/models/notification.model';

class NotificationRepositoryController implements INotificationRepository {
    public async Get(userId: any): Promise<NotificationModel> {
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

    public Create(notification: NotificationModel): Promise<NotificationModel> {
        throw new Error('Method not implemented.');
    }

    public async Update(notification: NotificationModel): Promise<NotificationModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(notification: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const NotificationRepository = new NotificationRepositoryController();
