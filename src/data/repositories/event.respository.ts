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
                    owner
                    title
                    description
                    address{
                        streetName
                        city{
                            id
                            name
                        }
                        county{
                            id
                            name
                        }
                    }
                    sport{
                        name,
                        defaultParticipantsNumber
                      }
                    freeSpots
                    cost
                    date
                    hour
                    duration
                    level
                },
                totalCount
                }
            }`;

        const response: any = await GraphqlClient.query(query);
        let results = await this.GetEventsMap(response.events);
        return results;
    }

    public async Get(id: any): Promise<EventDetailsViewModel> {
        const variables: any = { id: id };
        const query = gql`
            query eventDetails($id: String!){
             eventById(id: $id) {
                id
                owner
                title
                description
                address{
                    streetName
                    longitude
                    latitude
                    city{
                        id
                        name
                    }
                    county{
                        id
                        name
                    }
                }
                sport{
                    name,
                    defaultParticipantsNumber
                  }
                freeSpots
                cost
                date
                hour
                duration
                level
                }
            }
        `;

        const results: any = await GraphqlClient.queryWithVariables(query, variables);
        return MapModelHelper.MapEvent(results.eventById);
    }

    public async Create(eventDetails: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        let input: any = {
            event:
            {
                title: eventDetails.event.Name,
                description: eventDetails.description.Description,
                address: {
                    streetName: eventDetails.locationDetails.StreetName,
                    city: { id: eventDetails.locationDetails.City },
                    county: { id: "76rqy3nt07aydbwt" },
                    longitude: eventDetails.locationDetails.Longitude,
                    latitude: eventDetails.locationDetails.Latitude
                },
                sport: eventDetails.sport.Id,
                freeSpots: eventDetails.participantsDetails.FreeSpots,
                cost: eventDetails.participantsDetails.PriceForParticipant,
                date: eventDetails.description.Date,
                hour: eventDetails.description.Time,
                duration: eventDetails.description.Duration,
                level: eventDetails.participantsDetails.Level,
            }
        };

        const createEventMutation = gql`
            mutation crateEventMutation($event: EventInput!) {
                createEvent(input: $event) {
                    id
            }}`;

        const result: any = await GraphqlClient.mutate(createEventMutation, input);
        return result.createEvent.id;
    }

    public Update(data: EventDetailsViewModel): Promise<EventDetailsViewModel> {
        throw new Error('Method not implemented.');
    }

    public Delete(data: any): Promise<ResultModel<boolean>> {
        throw new Error('Method not implemented.');
    }

    public async Join(eventId: any): Promise<ResultModel<boolean>> {
        let input: any = { eventId: eventId };

        const joinEventMutation = gql`
            mutation joinEvent($eventId: String!) {
                joinEvent(eventId: $eventId)
                }`;

        const result: any = await GraphqlClient.mutate(joinEventMutation, input);
        return result.joinEvent;
    }

    private async GetEventsMap(model: any) {
        let result = new ListModel<EventDetailsViewModel>();
        result.Total = model.totalCount;
        model.items.forEach((element: any) => {
            let event = MapModelHelper.MapEvent(element);
            result.Data.push(event);
        });


        return result;
    }


}
export const EventRepository = new EventRepositoryController();
