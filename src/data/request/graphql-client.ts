import ApolloClient from 'apollo-boost';

class GraphqlClientController {
    private static instance: GraphqlClientController;
    private readonly client: ApolloClient<any>;

    private constructor() {
        this.client = new ApolloClient({
            uri: 'http://localhost:5000/graphql/'
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

    public async mutate<T>(mutation: any, variables: any){
        const response: any = await this.client.mutate({
            variables,
            mutation
        });

        const result: T = response.data;
        return result;
    }
}

const GraphqlClient: GraphqlClientController = GraphqlClientController.getInstance();
export default GraphqlClient;
