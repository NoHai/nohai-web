import { FirebaseConfig } from "./firebase.config";

export class AppConfig {
    public nohaiAppUrl: string | undefined;
    public facebookAppId: string | undefined;
    public googleApiKey!: string | undefined;
    public firebaseConfig!: FirebaseConfig;

    constructor() {
        this.nohaiAppUrl = process.env.REACT_APP_NOHAI_API_URL;
        this.facebookAppId = process.env.REACT_APP_NOHAI_FACEBOOK_APP_ID;
        this.googleApiKey = process.env.REACT_APP_NOHAI_GOOGLE_API_KEY;
        this.firebaseConfig =new FirebaseConfig();
    }
}