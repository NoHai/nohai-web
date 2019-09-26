import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import TokenProvider from '../../utilities/providers/token.provider';
import { AppConfig } from '../../contracts/models/env-models/app.config';
import { onError } from 'apollo-link-error';

class GraphqlClientController {
    private static instance: GraphqlClientController;
    private readonly client: ApolloClient<any>;

    private constructor() {
        const appConfig = new AppConfig();
        this.client = new ApolloClient({
            link: this.getAppoloLink(`${appConfig.nohaiAppUrl}/graphql`),
            cache: new InMemoryCache(), 
        });
    }

    static getInstance() {
        if (!GraphqlClientController.instance) {
            GraphqlClientController.instance = new GraphqlClientController();
        }

        return GraphqlClientController.instance;
    }

    public async query<T>(query: any) {
        const response: any = await this.client.query({
            query: query,
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
        });

        const result: T = response.data;
        return result;
    }

    public async queryWithVariables<T>(query: any, variables: any) {
        const response: any = await this.client.query({
            query: query,
            variables: variables,
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
        });
        const result: T = response.data;
        return result;
    }

    public async mutate<T>(mutation: any, variables: any) {
        const response: any = await this.client.mutate({
            variables,
            mutation,
            errorPolicy: 'all'
        });

        const result: T = response.data;
        return result;
    }


    private getAppoloLink(uri: string) {
        const httpLink = createHttpLink({
           uri
        });

        const onErrorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
              );
          
            if (networkError) console.log(`[Network error]: ${networkError}`);
          });

        const authMiddleware = setContext(async (req, { headers }) => {
            const token = await TokenProvider.getToken();
            return {
                headers: {
                    ...headers,
                    authorization: token !== null ? `Bearer ${token.accessToken}`: '',
                }, 
            }
          });

        return ApolloLink.from([authMiddleware, httpLink, onErrorLink]);
    }

}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
