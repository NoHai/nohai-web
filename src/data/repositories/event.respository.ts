import { EventModel, ResultModel, ListModel, EventDetailsViewModel } from '../../contracts/models';
import { IEventRepository } from '../../contracts/repositories/event-repository.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';

class EventRepositoryController implements IEventRepository {
    public Find(data: FindEventRequest): Promise<ListModel<EventDetailsViewModel>> {
        throw new Error('Method not implemented.');
    }

    public async Get(id: any): Promise<EventDetailsViewModel> {
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

    public async Create(eventDetails: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        let input: any = {
            event:
            {
                owner: eventDetails.event.Name,
                description: eventDetails.description.Description,
                location: eventDetails.locationDetails.Address + ', ' + eventDetails.locationDetails.City,
                sport: eventDetails.participantsDetails.Sport + ', ' + eventDetails.participantsDetails.Level,
                participantsNumber: eventDetails.participantsDetails.FreeSpots,
                cost: eventDetails.participantsDetails.PriceForParticipant,
                date: eventDetails.description.Date,
                hour: eventDetails.description.Time,
            }
        };

        const crateEventMutation = gql`
            mutation crateEventMutation($event: EventInput!) {
                createEvent(input: $event) {
                    id
            }}`;

        const result: any = await GraphqlClient.mutate(crateEventMutation, input);
        return result.createUser.id;
    }

    public Update(data: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }
}

export const EventRepository = new EventRepositoryController();
