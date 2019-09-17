import { LoginViewModel, RegisterViewModel } from '../../contracts/view-models';
import { LoginCommand } from '../commands/auth';
import { RegisterCommand } from '../commands/auth/register.command';
import TokenProvider from '../../utilities/providers/token.provider';
import HttpClient from '../../utilities/core/http-client';
import { UserModel } from '../../contracts/models';
import { LoginWithFbCommand } from '../commands/auth/login-with-fb.command';

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

        if (!!token) {
            await TokenProvider.saveToken(token);
            return true;
        }

        return false;
    }

    public async loginWithFb(email: string, name:string): Promise<boolean> {
        const model = new UserModel();
        model.Email=email
        model.FirstName= name.substr(0,name.indexOf(' '));
        model.LastName=name.substr(name.indexOf(' ')+1); 
        const token = await LoginWithFbCommand.execute(model);

        if (!!token) {
            await TokenProvider.saveToken(token);
            return true;
        }

        return false;
    }

    public async register(model: RegisterViewModel): Promise<boolean> {
        const token = await RegisterCommand.execute(model);
        if (!!token) {
            await TokenProvider.saveToken(token);
            return true;
        }

        return false;
    }

    public async isAuthorized(): Promise<boolean> {
        return await HttpClient.checkToken();
    }
}

const AuthService = AuthServiceController.getInstance();
export default AuthService;
