import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import TokenProvider from '../../utilities/providers/token.provider';

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

        const authMiddleware = setContext(async (req, { headers }) => {
            const token = await TokenProvider.getToken();
            return {
                headers: {
                    ...headers,
                    authorization: token !== null ? `Bearer ${token.accessToken}`: '',
                }
            }
          });

        return ApolloLink.from([authMiddleware, httpLink]);
    }

}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
