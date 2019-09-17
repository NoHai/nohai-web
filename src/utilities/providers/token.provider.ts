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
        const tokenValue = await StorageProvider.get(AuthKey.SessionId);
        if (!!tokenValue) {
            const token: Token = JSON.parse(tokenValue);
            return token;
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

    private tokenIsNotExpired(token: Token): boolean {
        const currentDate = new Date();
        const calculatedDate = new Date(currentDate.getTime() - 2 * 60000); // - 2 minutes
        return moment(token.expireDate).toDate() > calculatedDate;
    }
}

const TokenProvider: TokenProviderController = TokenProviderController.getInstance();
export default TokenProvider;
