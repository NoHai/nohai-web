import { RegisterViewModel, LoginViewModel } from '../../contracts/view-models';
import { Token } from '../../contracts/models/auth';
import { gql } from 'apollo-boost';
import GraphqlClient from '../request/graphql-client';
import { UserModel } from '../../contracts/models';

class AuthRepositoryController {
    public async login(model: LoginViewModel): Promise<Token> {
        let input: any = {
            credentials:
            {
                login: model.Email,
                password: model.Password
            }
        };

        const authMutation = gql`
            mutation authMutation($credentials: CredentialsInput!) {
                auth(input: $credentials) {
                    accessToken,
                    refreshToken,
                    expireIn,
            }}`;

        const result: any = await GraphqlClient.mutate(authMutation, input);
        const authToken: Token = result.auth;

        return authToken;
    }

    public async refreshToken(input: string): Promise<Token> {
        let refreshToken: any = {
            input
        };

        const refreshTokenMutation = gql`
            mutation refreshTokenMutation($input: String!) {
                refreshToken(input: $input) {
                    accessToken,
                    refreshToken,
                    expireIn,
            }}`;

        const result: any = await GraphqlClient.mutate(refreshTokenMutation, refreshToken);
        const authToken: Token = result.auth;

        return authToken;
    }

    public async loginwithFb(model: UserModel): Promise<Token> {
        let input: any = {
            credentials:
            {
                login: model.Email,
                firstName: model.FirstName,
                lastName: model.LastName,
            }
        };

        const authMutation = gql`
            mutation authMutation($credentials: FacebookCredentialsInput!) {
                loginFacebook(input: $credentials) {
                    accessToken,
                    refreshToken,
                    expireIn,
            }}`;

        const result: any = await GraphqlClient.mutate(authMutation, input);
        const authToken: Token = result.loginFacebook;

        return authToken;
    }

    public async register(register: RegisterViewModel): Promise<string> {
        let input: any = {
            credentials:
            {
                login: register.Email,
                password: register.Password
            }
        };

        const registerMutation = gql`
            mutation registerMutation($credentials: CredentialsInput!) {
                createUser(input: $credentials) {
                    id
            }}`;

        const response: any = await GraphqlClient.mutate(registerMutation, input);
        const result: string = response.createUser.id

        return result;
    }

    public async recoveryPassword(email: any): Promise<string> {
       let parameter: string  = email;
       const recoveryMutation =  gql`
        mutation recoverPassword($parmeter: String!) {
            recoverPassword(parameter: $parameter) {
                id
        }}`;

        const response: any = await GraphqlClient.mutate(recoveryMutation, parameter);
        const result: string = response.data;

        return result;
    }
    public async  resetPassword(user: UserModel): Promise<string> {
        let input: any = {
            credentials:
            {
                login: user.Email,
                password: user.Password
            }
        };
        const resetPasswordMutation =  gql`
         mutation updateCredentails($input: CredentialsInput!) {
             updateCredentails(input: $input) {
                 id
         }}`;
 
         const response: any = await GraphqlClient.mutate(resetPasswordMutation, input);
         const result: string = response.data;
 
         return result;
    }
}

export const AuthRepository = new AuthRepositoryController();
