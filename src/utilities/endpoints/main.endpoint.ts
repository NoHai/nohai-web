export default class MainEndpoint {
    public static get Api(): string {
        return process.env.REACT_APP_API_URL || '';
    }
}
