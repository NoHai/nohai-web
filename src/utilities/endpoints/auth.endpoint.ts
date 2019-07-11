import MainEndpoint from './main.endpoint';

export class AuthEndpoint {
    public static AuthUrl = `${MainEndpoint.Api}/auth`;
    public static Refresh = `${AuthEndpoint.AuthUrl}/refresh`;
    public static Login = `${AuthEndpoint.AuthUrl}/login`;
    public static Register = `${AuthEndpoint.AuthUrl}/register`;
    public static Recovery = `${AuthEndpoint.AuthUrl}/recovery`;
}
