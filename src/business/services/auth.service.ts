import StorageService from './storage.service';
import { AuthKey } from '../../contracts/enums/common';
import { LoginViewModel, RegisterViewModel } from '../../contracts/view-models';
import { LoginCommand } from '../commands/auth';
import { RegisterCommand } from '../commands/auth/register.command';

class AuthServiceController {
    private static instance: AuthServiceController;

    private constructor() {}

    static getInstance() {
        if (!AuthServiceController.instance) {
            AuthServiceController.instance = new AuthServiceController();
        }

        return AuthServiceController.instance;
    }

    public async login(email: string, password: string): Promise<boolean> {
        const model = new LoginViewModel(email, password);
        const token = await LoginCommand.execute(model);

        if (token) {
            this.saveToken(token);
            return true;
        }

        return false;
    }

    public async isValid() {
        const token = await this.getToken();
        return !!token;
    }

    public async register(model: RegisterViewModel): Promise<boolean> {
        const result = await RegisterCommand.execute(model);
        return result;
    }

    private async saveToken(token: string) {
        await StorageService.set(AuthKey.SessionId, token);
    }

    private async getToken() {
        const token = StorageService.get(AuthKey.SessionId);
        return token;
    }
}

const AuthService = AuthServiceController.getInstance();
export default AuthService;
