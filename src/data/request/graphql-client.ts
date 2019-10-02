import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink, NextLink, Operation, Observable, FetchResult } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import TokenProvider from '../../utilities/providers/token.provider';
import { AppConfig } from '../../contracts/models/env-models/app.config';
import { onError, ErrorResponse } from 'apollo-link-error';
import MessageHelper from '../../helpers/message.helper';
import HttpClient from '../../utilities/core/http-client';


class GraphqlClientController {
  private static instance: GraphqlClientController;
  private readonly client: ApolloClient<any>;

  private constructor() {
    const appConfig = new AppConfig();
    const apiLink = `${appConfig.nohaiAppUrl}/graphql`;
    this.client = new ApolloClient({
      link: this.getAppoloLink(apiLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'network-only',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
  }

  static getInstance() {
    if (!GraphqlClientController.instance) {
      GraphqlClientController.instance = new GraphqlClientController();
    }

    return GraphqlClientController.instance;
  }

  public async query<T>(query: any) {
    try {
      const response: any = await this.client.query({
        query,
      });

      const result: T = response.data;
      return result;
    } catch (e) {
      console.log(e);

    }
  }

  public async queryWithVariables<T>(query: any, variables: any) {
    try {
      const response: any = await this.client.query({
        query,
        variables,
      });
      const result: T = response.data;
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  public async mutate<T>(mutation: any, variables: any) {
    try {
      const response: any = await this.client.mutate({
        variables,
        mutation,
      });

      const result: T = response.data;
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  private getAppoloLink(uri: string) {
    const httpLink = createHttpLink({
      uri,
    });

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, }) => {
          const error: any = JSON.parse(message);
          this.handleGraphQlError(error);

        });
      }

      if (networkError && 'statusCode' in networkError) {
        if (networkError.statusCode === 401) {
          return new Observable(observer => {
            this.checkToken()
              .then(refreshResponse => {
                const headers = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...headers,
                    authorization: refreshResponse !== null ? `Bearer ${refreshResponse.accessToken}` : '',
                  },
                });
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };
                forward(operation).subscribe(subscriber);
              }).catch(err => {
                TokenProvider.removeToken();
                observer.error(err);
              });
          });
        }
      }
    });

    const authMiddleware = setContext(async (req, { headers }) => {
      const token = await this.checkToken();
      return {
        headers: {
          ...headers,
          authorization: token !== null ? `Bearer ${token.accessToken}` : '',
        },
      };
    });

    return ApolloLink.from([authMiddleware, errorLink, httpLink]);
  }

  private async retryWithRefresh(operation: Operation, forward: NextLink) {
    return new Observable(observer => {
      this.checkToken()
        .then(refreshResponse => {
          const headers = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...headers,
              authorization: refreshResponse !== null ? `Bearer ${refreshResponse.accessToken}` : '',
            },
          });
        })
        .then(() => {
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          };
          forward(operation).subscribe(subscriber);
        }).catch(err => {
          TokenProvider.removeToken();
          observer.error(err);
        });
    });
  }

  private handleGraphQlError(message: any) {
    const status = message.status || null;
    switch (status) {
      case 401:
        MessageHelper.showError('Unauthorized error');
        break;
      case 500:
        MessageHelper.showError('Server error');
        break;
      default:
        MessageHelper.showError('Ooops ceva s-a intamplat!');
        break;
    }
  }

  private async checkToken() {
    const token = await TokenProvider.getToken();

    if (!TokenProvider.isTokenValid(token)) {
      return await HttpClient.refreshToken(token);
    } else {
      return token;
    }
  }
}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
