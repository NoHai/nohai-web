import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import StorageProvider from '../../utilities/providers/storage.provider';
import { AuthKey } from '../../contracts/enums/common';
import { InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

class GraphqlClientController {
    private static instance: GraphqlClientController;
    private readonly client: ApolloClient<any>;

    private constructor() {
        this.client = new ApolloClient({
            link: this.getAppoloLink('http://localhost:5000/graphql/'),
            cache: new InMemoryCache()
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
        });

        const result: T = response.data;
        return result;
    }

    public async queryWithVariables<T>(query: any, variables: any) {
        const response: any = await this.client.query({
            query: query,
            variables: variables,
            fetchPolicy: 'network-only',
        });
        const result: T = response.data;
        return result;
    }

    public async mutate<T>(mutation: any, variables: any) {
        const response: any = await this.client.mutate({
            variables,
            mutation,
        });

        const result: T = response.data;
        return result;
    }


    private getAppoloLink(uri: string) {
        const httpLink = createHttpLink({
           uri
        });
        let authToken: string;
        StorageProvider.get(AuthKey.SessionId)
                        .then((token) => authToken = JSON.parse(token).auth.accessToken)
                        .catch(() => authToken = '');

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: authToken ? `Bearer ${authToken}` : "",
                }
            }
        });

        return authLink.concat(httpLink);

    }

}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
