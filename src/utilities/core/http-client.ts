import TokenProvider from '../providers/token.provider';
import { Token } from '../../contracts/models/auth';
import { AuthEndpoint } from '../endpoints';

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

        const result = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return await result.json();
    }

    public async post(url: string, data?: any, checkToken: boolean = true) {
        checkToken && (await this.checkToken());
        const accessToken = await this.getAccessToken();

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });

        return await result.json();
    }

    public async checkToken(): Promise<boolean> {
        let token = await TokenProvider.getToken();

        if (!TokenProvider.isTokenValid(token)) {
            return await this.refreshToken(token);
        }

        return false;
    }

    private async refreshToken(token: Token | null): Promise<boolean> {
        if (!!token) {
            try {
                const data = {
                    RefreshToken: token.RefreshToken,
                };

                const result = await this.post(AuthEndpoint.Refresh, data, false);
                const newToken: Token = await result.json();
                await TokenProvider.saveToken(newToken);

                return true;
            } catch {
                return false;
            }
        }

        return false;
    }

    private async getAccessToken(): Promise<string> {
        const token = await TokenProvider.getToken();
        if (!!token) {
            return token.AccessToken;
        }

        return '';
    }
}

const HttpClient: HttpClientController = HttpClientController.getInstance();
export default HttpClient;
