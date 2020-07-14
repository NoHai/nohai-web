import { ResultModel, ListModel, EventDetailsViewModel } from '../../contracts/models';
import { IEventRepository } from '../../contracts/repositories/event-repository.interface';
import { FindEventRequest } from '../../contracts/requests/find-event.request';
import GraphqlClient from '../request/graphql-client';
import gql from 'graphql-tag';
import MapModelHelper from '../../helpers/map-model.helper';

class EventRepositoryController implements IEventRepository {
  public async Find(data: FindEventRequest): Promise<ListModel<EventDetailsViewModel>> {
    const parameter: any = {
      parameter: {
        sports: data.sports,
        startDate: data.startDate,
        searchText: data.searchText,
        showHistory: data.showHistory,
        pagination: { pageSize: data.pageSize, pageIndex: data.pageIndex },
      },
    };

    const query = gql`
      query events($parameter: SearchEventsParameter!) {
        events(parameter: $parameter) {
          items {
            id
            status
            owner {
              id
              details {
                firstName
                lastName
                picture
              }
            }
            title
            description
            numberOfParticipants
            address {
              streetName
              city
              county
            }
            sport {
              id
              name
              defaultParticipantsNumber
              imagePath
            }
            freeSpots
            cost
            startDate
            endDate
            startTime
            endTime
            level
            createdDate
          }
          totalCount
        }
      }
    `;

    const response: any = await GraphqlClient.queryWithVariables(query, parameter);
    const results = await this.GetEventsMap(response.events);
    return results;
  }

  public async Get(parameter: any): Promise<EventDetailsViewModel> {
    const variables: any = { parameter };
    const query = gql`
      query eventDetails($parameter: String!) {
        eventDetails(parameter: $parameter) {
          event {
            id
            status
            owner {
              id
              details {
                firstName
                lastName
                picture
              }
            }
            title
            description
            numberOfParticipants
            createdDate
            address {
              streetName
              longitude
              latitude
              city
              county
            }
            sport {
              id
              name
              defaultParticipantsNumber
              imagePath
            }
            freeSpots
            cost
            startDate
            endDate
            startTime
            endTime
            level
          }
          userEvents {
            status
            user {
              id
              details {
                firstName
                lastName
                picture
              }
            }
          }
        }
      }
    `;

    const results: any = await GraphqlClient.queryWithVariables(query, variables);
    return MapModelHelper.MapEventDetails(results.eventDetails);
  }

  public async Create(eventDetails: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    const input: any = {
      event: {
        id: eventDetails.event.Id,
        description: eventDetails.description.Description,
        address: {
          streetName: eventDetails.locationDetails.StreetName,
          city: eventDetails.locationDetails.City,
          county: eventDetails.locationDetails.County,
          longitude: eventDetails.locationDetails.Longitude,
          latitude: eventDetails.locationDetails.Latitude,
        },
        sport: { id: eventDetails.participantsDetails.ActivityId },
        freeSpots: eventDetails.participantsDetails.FreeSpots,
        cost: eventDetails.participantsDetails.PriceForParticipant
          ? eventDetails.participantsDetails.PriceForParticipant
          : 0,
        startDate: eventDetails.description.StartDate,
        endDate: eventDetails.description.EndDate,
        startTime: eventDetails.description.StartTime,
        endTime: eventDetails.description.EndTime,
        level: eventDetails.participantsDetails.Level,
        owner: { id: eventDetails.owner.Id },
      },
    };

    const saveEventMutation = gql`
      mutation saveEventMutation($event: EventInput!) {
        saveEvent(input: $event) {
          id
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(saveEventMutation, input);
    return result.saveEvent.id;
  }

  Update(data: EventDetailsViewModel): Promise<EventDetailsViewModel> {
    throw new Error('Method not implemented.');
  }

  async Delete(id: any): Promise<ResultModel<boolean>> {
    const parameter: any = { parameter: id };

    const cancelEventMutation = gql`
      mutation cancelEvent($parameter: String!) {
        cancelEvent(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(cancelEventMutation, parameter);
    return result.cancelEvent;
  }

  async Join(eventId: any): Promise<ResultModel<boolean>> {
    const input: any = { eventId };

    const joinEventMutation = gql`
      mutation joinEvent($eventId: String!) {
        joinEvent(eventId: $eventId)
      }
    `;

    const result: any = await GraphqlClient.mutate(joinEventMutation, input);
    return result.joinEvent;
  }

  async CancelPendingRequest(parameter: any): Promise<ResultModel<boolean>> {
    const input: any = { parameter };

    const cancelPendingRequestMutation = gql`
      mutation cancelPendingRequest($parameter: String!) {
        cancelPendingRequest(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(cancelPendingRequestMutation, input);
    return result.cancelPendingRequest;
  }

  async KickoutParticipant(parameter: any): Promise<ResultModel<boolean>> {
    const input: any = { parameter };

    const kickoutUserMutation = gql`
      mutation kickoutUser($parameter: EventUserParameter!) {
        kickoutUser(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(kickoutUserMutation, input);
    return result.kickoutUser;
  }

  async Approve(parameter: any): Promise<ResultModel<boolean>> {
    const input: any = { parameter };

    const approveRequestMutation = gql`
      mutation approveRequest($parameter: String!) {
        approveRequest(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(approveRequestMutation, input);
    return result.approveRequest;
  }

  async Leave(id: any): Promise<ResultModel<boolean>> {
    const parameter: any = { parameter: id };

    const leaveEventMutation = gql`
      mutation leaveEvent($parameter: String!) {
        leaveEvent(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(leaveEventMutation, parameter);
    return result.leaveEvent;
  }

  async Reject(parameter: any): Promise<ResultModel<boolean>> {
    const input: any = { parameter };

    const rejectRequestMutation = gql`
      mutation rejectRequest($parameter: String!) {
        rejectRequest(parameter: $parameter)
      }
    `;

    const result: any = await GraphqlClient.mutate(rejectRequestMutation, input);
    return result.approveRequest;
  }

  private async GetEventsMap(model: any) {
    const result = new ListModel<EventDetailsViewModel>();
    result.Total = model.totalCount;
    model.items.forEach((element: any) => {
      const event = MapModelHelper.MapEvent(element);
      result.Data.push(event);
    });

    return result;
  }
}
export const EventRepository = new EventRepositoryController();
