import { RegisterViewModel, LoginViewModel } from '../../contracts/view-models';
import { Token } from '../../contracts/models/auth';
import { gql } from 'apollo-boost';
import GraphqlClient from '../request/graphql-client';
import { UserModel } from '../../contracts/models';

class AuthRepositoryController {
  public async login(model: LoginViewModel): Promise<Token> {
    let input: any = {
      credentials: {
        login: model.Email,
        password: model.Password,
      },
    };

    const authMutation = gql`
      mutation authMutation($credentials: CredentialsInput!) {
        auth(input: $credentials) {
          accessToken
          refreshToken
          expireIn
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(authMutation, input);
    const authToken: Token = result.auth;

    return authToken;
  }

  public async refreshToken(input: string): Promise<Token> {
    let refreshToken: any = {
      input,
    };

    const refreshTokenMutation = gql`
      mutation refreshTokenMutation($input: String!) {
        refreshToken(input: $input) {
          accessToken
          refreshToken
          expireIn
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(refreshTokenMutation, refreshToken);
    const authToken: Token = result.auth;

    return authToken;
  }

  public async loginwithFb(model: UserModel): Promise<Token> {
    let input: any = {
      credentials: {
        accessToken: model.AccesToken,
        userId: model.Id,
      },
    };

    const authMutation = gql`
      mutation authMutation($credentials: FacebookCredentialsInput!) {
        loginFacebook(input: $credentials) {
          accessToken
          refreshToken
          expireIn
        }
      }
    `;

    const result: any = await GraphqlClient.mutate(authMutation, input);
    const authToken: Token = result.loginFacebook;

    return authToken;
  }

  public async register(register: RegisterViewModel): Promise<string> {
    let input: any = {
      credentials: {
        login: register.Email.trim(),
        password: register.Password,
      },
    };

    const registerMutation = gql`
      mutation registerMutation($credentials: CredentialsInput!) {
        createUser(input: $credentials) {
          id
        }
      }
    `;

    const response: any = await GraphqlClient.mutate(registerMutation, input);
    var result = response;
    if (response) {
       result = response.createUser.id;
    }

    return result;
  }

  public async recoveryPassword(email: string): Promise<string> {
    const parameter: any = { parameter: email };
    const recoveryMutation = gql`
      mutation recoverPassword($parameter: String!) {
        recoverPassword(parameter: $parameter)
      }
    `;

    const response: any = await GraphqlClient.mutate(recoveryMutation, parameter);
    const result: string = response.data;

    return result;
  }
  public async resetPassword(user: UserModel): Promise<boolean> {
    const input: any = {
      credentials: {
        login: user.Email,
        password: user.Password,
      },
    };
    const resetPasswordMutation = gql`
      mutation updateCredentials($credentials: CredentialsInput!) {
        updateCredentials(input: $credentials)
      }
    `;

    const response: any = await GraphqlClient.mutate(resetPasswordMutation, input);
    const result: boolean = response.updateCredentials;

    return result;
  }
}

export const AuthRepository = new AuthRepositoryController();
