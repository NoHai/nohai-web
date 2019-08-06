import { ResultModel, ListModel, EventDetailsViewModel } from '../../contracts/models';
import { IEventRepository } from '../../contracts/repositories/event-repository.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';
import MapModelHelper from '../../helpers/map-model.helper';

class EventRepositoryController implements IEventRepository {
    public async Find(data: FindEventRequest): Promise<ListModel<EventDetailsViewModel>> {

        const query = gql`
            query {events(parameter: {title: "", pagination: {pageSize:${data.pageSize} , pageIndex: ${data.pageIndex}}}) {
                items {
                    id
                    title
                    description
                    location
                    sport
                    participantsNumber
                    cost
                    owner
                    date
                    hour
                    duration
                    }
                }
            }`;

        const response: any = await GraphqlClient.query(query);
        let results = await this.GetEventsMap(response.events.items);
        return results;
    }

    public async Get(id: any): Promise<EventDetailsViewModel> {
        let input: any = {
            id: id
        }
        const query = gql`
        {
            eventById(id: ${input}) {
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
                owner: "owner event",
                title: "title",
                description: eventDetails.description.Description,
                location: eventDetails.locationDetails.Address + ', ' + eventDetails.locationDetails.City,
                sport: eventDetails.participantsDetails.Sport + '   - ' + eventDetails.participantsDetails.Level,
                participantsNumber: eventDetails.participantsDetails.FreeSpots,
                cost: eventDetails.participantsDetails.PriceForParticipant,
                date: eventDetails.description.Date,
                hour: eventDetails.description.Time,
                duration: eventDetails.description.Duration,
            }
        };

        const crateEventMutation = gql`
            mutation crateEventMutation($event: EventInput!) {
                createEvent(input: $event) {
                    id
            }}`;

        const result: any = await GraphqlClient.mutate(crateEventMutation, input);
        return result.createEvent.id;
    }

    public Update(data: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }

    private async GetEventsMap(model: any) {
        let result = new ListModel<EventDetailsViewModel>();
        result.Total = model.length;
        model.forEach((element:any) => {
            let event = MapModelHelper.MapEvent(element);
            result.Data.push(event);
        });


        return result;
    }

    
}
export const EventRepository = new EventRepositoryController();
