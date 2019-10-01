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
                    owner{
                        id 
                        firstName 
                        lastName
                        picture
                    }
                    title
                    description
                    address{
                        streetName
                        city
                        county
                    }
                    sport{
                        name,
                        defaultParticipantsNumber
                        imagePath
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

  public async Get(parameter: any): Promise<EventDetailsViewModel> {
    const variables: any = { parameter: parameter };
    const query = gql`
      query eventDetails($parameter: String!) {
        eventDetails(parameter: $parameter) {
          event {
            id
            owner {
              id
              firstName
              lastName
              picture
            }
            title
            description
            address {
              streetName
              longitude
              latitude
              city
              county
            }
            sport {
              name
              defaultParticipantsNumber
              imagePath
            }
            freeSpots
            cost
            date
            hour
            duration
            level
          }
          userEvents {
            status
            user {
              id
              firstName
              lastName
              picture
            }
          }
        }
      }
    `;

    const results: any = await GraphqlClient.queryWithVariables(query, variables);
    return MapModelHelper.MapEventDetails(results.eventDetails);
  }

  public async Create(eventDetails: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    let input: any = {
      event: {
        title: eventDetails.event.Name,
        description: eventDetails.description.Description,
        address: {
          streetName: eventDetails.locationDetails.StreetName,
          city: eventDetails.locationDetails.City,
          county: eventDetails.locationDetails.County,
          longitude: eventDetails.locationDetails.Longitude,
          latitude: eventDetails.locationDetails.Latitude,
        },
        sport: { id: eventDetails.sport.Id },
        freeSpots: eventDetails.participantsDetails.FreeSpots,
        cost: eventDetails.participantsDetails.PriceForParticipant,
        date: eventDetails.description.Date,
        hour: eventDetails.description.Time,
        duration: eventDetails.description.Duration,
        level: eventDetails.participantsDetails.Level,
      },
    };

    const createEventMutation = gql`
      mutation crateEventMutation($event: EventInput!) {
        createEvent(input: $event) {
          id
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(createEventMutation, input);
    return result.createEvent.id;
  }

  Update(data: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    throw new Error('Method not implemented.');
  }

  Delete(data: any): Promise<ResultModel<boolean>> {
    throw new Error('Method not implemented.');
  }

  async Join(eventId: any): Promise<ResultModel<boolean>> {
    let input: any = { eventId: eventId };

    const joinEventMutation = gql`
      mutation joinEvent($eventId: String!) {
        joinEvent(eventId: $eventId)
      }
    `;

    const result: any = await GraphqlClient.mutate(joinEventMutation, input);
    return result.joinEvent;
  }

  async Approve(parameter: any): Promise<ResultModel<boolean>> {
    let input: any = { parameter: parameter };

    const approveRequestMutation = gql`
      mutation approveRequest($parameter: String!) {
        approveRequest(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(approveRequestMutation, input);
    return result.approveRequest;
  }
  async Reject(parameter: any): Promise<ResultModel<boolean>> {
    let input: any = { parameter: parameter };

    const rejectRequestMutation = gql`
      mutation rejectRequest($parameter: String!) {
        rejectRequest(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(rejectRequestMutation, input);
    return result.approveRequest;
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
