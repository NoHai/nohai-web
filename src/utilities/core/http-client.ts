import TokenProvider from '../providers/token.provider';
import { Token } from '../../contracts/models/auth';
import { HttpMethod } from '../../contracts/enums/common';
import { AuthEndpoint } from '../endpoints/auth.endpoint';

class HttpClientController {
  private static instance: HttpClientController;

  private constructor() {}

  static getInstance() {
    if (!HttpClientController.instance) {
      HttpClientController.instance = new HttpClientController();
    }

    return HttpClientController.instance;
  }

  public async get(url: string, checkToken: boolean = true) {
    checkToken && (await this.checkToken());
    const accessToken = await this.getAccessToken();
    const result = await this.doFetch(HttpMethod.Get, url, accessToken);

    if (result.ok) {
      return await result.json();
    }
  }

  public async post(url: string, data?: any, checkToken: boolean = true) {
    checkToken && (await this.checkToken());
    const accessToken = await this.getAccessToken();
    const result = await this.doFetch(HttpMethod.Post, url, accessToken, data);

    if (result.ok) {
      return await result.json();
    }

    return null;
  }

  public async checkToken(): Promise<boolean> {
    const token = await TokenProvider.getToken();

    if (!TokenProvider.isTokenValid(token)) {
      const result = await this.refreshToken(token);
      return result !== null;
    }

    return true;
  }

  public async refreshToken(token: Token | null): Promise<Token| null> {
    if (!!token) {
      try {
        const data = {refreshToken: token.refreshToken };
        const result = await this.post(AuthEndpoint.Refresh, data, false);

        if (!!result) {
          await TokenProvider.saveToken(result);
        }
      } catch {
        return null;
      }
    }

    return null;
  }

  public async login(email: string, password: string): Promise<boolean> {
    if (!!email && !!password) {
      try {
        const data = {login: email, password };
        const result = await this.post(AuthEndpoint.Refresh, data, false);

        if (!!result) {
          await TokenProvider.saveToken(result);
          return true;
        }
      } catch {
        return false;
      }
    }

    return false;
  }

  private async getAccessToken(): Promise<string> {
    const token = await TokenProvider.getToken();
    if (!!token) {
      return token.accessToken;
    }

    return '';
  }

  private async doFetch(
    method: HttpMethod,
    url: string,
    accessToken: string,
    data: any = null
  ): Promise<Response> {
    const body = !!data ? JSON.stringify(data) : null;

    return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body,
    });
  }
}

const HttpClient: HttpClientController = HttpClientController.getInstance();
export default HttpClient;
