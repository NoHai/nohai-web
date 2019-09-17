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
            }}`;

        const result: any = await GraphqlClient.mutate(authMutation, input);
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
            }}`;

        const result: any = await GraphqlClient.mutate(authMutation, input);
        const authToken: Token = result.loginFacebook;

        return authToken;
    }

    public async register(register: RegisterViewModel): Promise<Token> {
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

       const userId =   await GraphqlClient.mutate(registerMutation, input);
       console.log(userId);

        const authMutation = gql`
        mutation authMutation($credentials: CredentialsInput!) {
            auth(input: $credentials) {
                accessToken,
                refreshToken,
        }}`;

        const result : any = await GraphqlClient.mutate(authMutation, input);
        const authToken: Token = result.auth;

        return authToken;
    }
}

export const AuthRepository = new AuthRepositoryController();
