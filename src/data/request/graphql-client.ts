import ApolloClient from 'apollo-boost';

class GraphqlClientController {
    private static instance: GraphqlClientController;
    private readonly client: ApolloClient<any>;

    private constructor() {
        this.client = new ApolloClient({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
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
        });

        const result: T = response.data;
        return result;
    }
}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
