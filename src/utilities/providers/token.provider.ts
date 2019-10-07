import StorageProvider from './storage.provider';
import { Token } from '../../contracts/models/auth';
import { AuthKey } from '../../contracts/enums/common';
import moment from 'moment';
import HttpClient from '../core/http-client';

class TokenProviderController {
  private static instance: TokenProviderController;

  private constructor() { }

  static getInstance() {
    if (!TokenProviderController.instance) {
      TokenProviderController.instance = new TokenProviderController();
    }

    return TokenProviderController.instance;
  }

  public async saveToken(token: Token) {
    const currentDate = moment.now();
    const calculatedDate = moment(currentDate).add(token.expireIn - 30, 'seconds');
    token.expireDate = calculatedDate.toDate();
    const tokenValue = JSON.stringify(token);
    await StorageProvider.remove(AuthKey.SessionId);
    await StorageProvider.set(AuthKey.SessionId, tokenValue);
  }

  public async getToken(): Promise<Token | null> {
    try {
      const tokenValue = await StorageProvider.get(AuthKey.SessionId);
      if (!!tokenValue) {
        const token: Token = JSON.parse(tokenValue);
        return token;
      }
    } catch {
      await this.logout();
    }

    return null;
  }

  public async removeToken() {
    await StorageProvider.remove(AuthKey.SessionId);
  }

  public async isValid(): Promise<boolean> {
    const token = await this.getToken();
    return this.isTokenValid(token);
  }

  public isTokenValid(token: Token | null): boolean {
    return !!token && this.tokenIsNotExpired(token);
  }

  public async getUser() {
    const token = await this.getToken();
    return !!token ? this.parseToken(token.accessToken) : null;
  }

  public tokenIsNotExpired(token: Token): boolean {
    const currentDate = moment.now();
    const calculatedDate = moment(currentDate).subtract(30, 'seconds');
    const expireDate = moment(token.expireDate).toDate();
    return moment(expireDate).isAfter(calculatedDate);
  }

  private async  logout() {
    await this.removeToken();
    window.location.reload();
  }

  public parseToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  public async fetchToken() {
    try {
      const token = await TokenProvider.getToken();

      if (token) {
        if (this.tokenIsNotExpired(token) === false) {
          const refreshToken = await HttpClient.refreshToken(token);
          return refreshToken;
        } else {
          return token;
        }
      } else {
        return token;
      }
    } catch (err) {
      await this.logout();
      return null;
    }
  }
}

const TokenProvider: TokenProviderController = TokenProviderController.getInstance();
export default TokenProvider;
