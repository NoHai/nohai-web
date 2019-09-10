export class LoginViewModel {
    Email!: string;
    Password!: string;
    IsLogWithFb!:boolean;

    constructor(email: string, password: string) {
        this.Email = email;
        this.Password = password;
    }
}
