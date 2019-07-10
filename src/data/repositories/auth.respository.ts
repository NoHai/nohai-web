import { RegisterViewModel, LoginViewModel } from '../../contracts/view-models';

class AuthRepositoryController {
    public async login(model: LoginViewModel): Promise<string> {
        // TODO: HTTP call
        return "";
    }

    public async register(register: RegisterViewModel): Promise<boolean>{
        return false;
    }
}

export const AuthRepository = new AuthRepositoryController();
