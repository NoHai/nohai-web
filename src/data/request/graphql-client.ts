import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import TokenProvider from '../../utilities/providers/token.provider';
import { AppConfig } from '../../contracts/models/env-models/app.config';
import { onError } from 'apollo-link-error';
import MessageHelper from '../../helpers/message.helper';
import AuthService from '../../business/services/auth.service';
import { Token } from '../../contracts/models/auth';

class GraphqlClientController {
    private static instance: GraphqlClientController;
    private readonly client: ApolloClient<any>;

    private constructor() {
        const appConfig = new AppConfig();
        const apiLink = `${appConfig.nohaiAppUrl}/graphql`
        this.client = new ApolloClient({
            link: this.getAppoloLink(apiLink),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    errorPolicy: 'all'
                },
                query: {
                    errorPolicy: 'all',
                    fetchPolicy: 'network-only',
                },
                mutate: {
                    errorPolicy: 'all'
                }
            }
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
                query: query,
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
                query: query,
                variables: variables,
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

        const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
            if(graphQLErrors)
                graphQLErrors.map(({ message, originalError }) => {
                  
                    const formattedMessage = message.replace('Unexpected error value: ', '').replace(/(^")|("$)/g, '');
                    MessageHelper.showError(formattedMessage)
                });

            if(networkError) MessageHelper.showError(networkError.message);
        });

        const authMiddleware = setContext(async (req, { headers }) => {
            const token = await TokenProvider.getToken();
            return {
                headers: {
                    ...headers,
                    authorization: token !== null ? `Bearer ${token.accessToken}` : '',
                },
            }
        });

        return ApolloLink.from([authMiddleware, errorLink, httpLink]);
    }

}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
