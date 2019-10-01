import MainEndpoint from './main.endpoint';

export class EventEndpoint {
  public static EventUrl = `${MainEndpoint.Api}/event`;
  public static Find = `${EventEndpoint.EventUrl}/find`;
  public static Get = `${EventEndpoint.EventUrl}/get`;
  public static Create = `${EventEndpoint.EventUrl}/create`;
  public static Update = `${EventEndpoint.EventUrl}/update`;
  public static Delete = `${EventEndpoint.EventUrl}/delete`;
}
