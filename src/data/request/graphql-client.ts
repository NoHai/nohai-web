import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink, Observable } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import TokenProvider from '../../utilities/providers/token.provider';
import { AppConfig } from '../../contracts/models/env-models/app.config';
import { onError, ErrorResponse } from 'apollo-link-error';
import MessageHelper from '../../helpers/message.helper';

class GraphqlClientController {
  private static instance: GraphqlClientController;
  private client: ApolloClient<any>;

  private constructor() {
    this.client = this.buildClient();
  }

  public buildClient() {
    const appConfig = new AppConfig();
    const apiLink = `${appConfig.nohaiAppUrl}/graphql`;
    const apolloClient = new ApolloClient({
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

    return apolloClient;
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
      if (graphQLErrors && networkError === undefined) {
        graphQLErrors.map(({ message, }) => {
          return MessageHelper.showError(message);
        });
      }

      if (networkError && 'statusCode' in networkError) {
        if (networkError.statusCode === 401) {
          return new Observable(observer => {
            TokenProvider.fetchToken()
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
                observer.error(err);
              });
          });
        } else {
          const errorMessage = graphQLErrors
            ? graphQLErrors.map(({ message, }) => message)[0]
            : '';
          this.handleError(networkError.statusCode, errorMessage);
        }
      }
    });

    const authMiddleware = setContext(async (_, { headers }) => {
      const token = await TokenProvider.fetchToken();
      return {
        headers: {
          ...headers,
          authorization: token !== null ? `Bearer ${token.accessToken}` : '',
        },
      };
    });

    return ApolloLink.from([authMiddleware, errorLink, httpLink]);
  }

  private handleError(status: number, message: string = '') {
    switch (status) {
      case 401:
        MessageHelper.showError('Unauthorized error');
        break;
      case 500:
        const errorMessage = message.length > 0 ? message : 'Server error';
        MessageHelper.showError(errorMessage);
        break;
      default:
        MessageHelper.showError('Ooops ceva s-a intamplat!');
        break;
    }
  }

}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
