import { RegisterViewModel, LoginViewModel } from '../../contracts/view-models';
import { Token } from '../../contracts/models/auth';

class AuthRepositoryController {
    public async login(model: LoginViewModel): Promise<Token> {
        // TODO: HTTP call
        const token = new Token();
        token.AccessToken = 'access_token';
        token.RefreshToken = 'refresh_token';
        token.ExpireIn = 3600;
        token.ExpireDate = new Date(2019, 6, 12);
        return token;
    }

    public async register(register: RegisterViewModel): Promise<boolean> {
        return false;
    }
}

export const AuthRepository = new AuthRepositoryController();
