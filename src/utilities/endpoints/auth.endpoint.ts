import MainEndpoint from './main.endpoint';

export class AuthEndpoint {
  public static Refresh = `${MainEndpoint.Api}/refresh`;
  public static Login = `${MainEndpoint.Api}/login`;
}
