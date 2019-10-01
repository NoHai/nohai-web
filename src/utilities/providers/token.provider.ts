import StorageProvider from './storage.provider';
import { Token } from '../../contracts/models/auth';
import { AuthKey } from '../../contracts/enums/common';
import moment from 'moment';

class TokenProviderController {
  private static instance: TokenProviderController;

  private constructor() {}

  static getInstance() {
    if (!TokenProviderController.instance) {
      TokenProviderController.instance = new TokenProviderController();
    }

    return TokenProviderController.instance;
  }

  public async saveToken(token: Token) {
    const currentDate = new Date();
    const calculatedDate = new Date(currentDate.getTime() + token.expireIn * 1000); // - seconds to milliseconds
    token.expireDate = calculatedDate;
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
      this.logout();
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

  private tokenIsNotExpired(token: Token): boolean {
    const currentDate = new Date();
    const calculatedDate = new Date(currentDate.getTime() - 2 * 60000); // - 2 minutes
    return moment(token.expireDate).toDate() > calculatedDate;
  }

  private logout() {
    this.removeToken();
    window.location.reload();
  }

  public parseToken(token: string): any {
    try {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
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
}

const TokenProvider: TokenProviderController = TokenProviderController.getInstance();
export default TokenProvider;
