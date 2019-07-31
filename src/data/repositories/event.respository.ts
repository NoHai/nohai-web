import { EventModel, ResultModel, ListModel } from '../../contracts/models';
import { IEventRepository } from '../../contracts/repositories/event-repository.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';

class EventRepositoryController implements IEventRepository {
    public Find(data: FindEventRequest): Promise<ListModel<EventModel>> {
        throw new Error('Method not implemented.');
    }

    public async Get(id: any): Promise<EventModel> {
        const query = gql`
        {
            event(id: ${id}) {
                title,
                description
            }
        }
    `;

        const results: any = await GraphqlClient.query(query);
        return results.event;
    }

    public Create(data: EventModel): Promise<EventModel> {
        throw new Error('Method not implemented.');
    }

    public Update(data: EventModel): Promise<EventModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const EventRepository = new EventRepositoryController();
