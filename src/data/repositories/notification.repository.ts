import { ResultModel, ListModel } from '../../contracts/models';
import gql from 'graphql-tag';
import GraphqlClient from '../request/graphql-client';
import { INotificationRepository } from '../../contracts/repositories/notification.repository.interface';
import { NotificationModel } from '../../contracts/models/notification.model';
import MapModelHelper from '../../helpers/map-model.helper';
import { PaginationBaseRequestModel } from '../../contracts/requests/pagination.base.model.request';

class NotificationRepositoryController implements INotificationRepository {

    public Get(id: any): Promise<NotificationModel> {
        throw new Error("Method not implemented.");
    }

    public async Find(request: PaginationBaseRequestModel): Promise<ListModel<NotificationModel>> {

        const query = gql`
        query{
            getNotifications(parameter: {pageSize:${request.pageSize} , pageIndex: ${request.pageIndex}}){
              items{
                id
                title
                eventId
                body
                avatarUrl
                createdDate
                status
                notificationType
              },
              totalCount
            }
           }
        `;

        const response: any = await GraphqlClient.query(query);
        let results = await this.GetEventsMap(response.getNotifications);
        return results;

    }

    public MarkAllAsRead():  Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
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

    private async GetEventsMap(model: any) {
        let result = new ListModel<NotificationModel>();

        if (model) {
            result.Total = model.totalCount;
            model.items.forEach((element: any) => {
                let event = MapModelHelper.MapNotification(element);
                result.Data.push(event);
            });
        }

        return result;
    }
}

export const NotificationRepository = new NotificationRepositoryController();