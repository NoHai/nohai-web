export class FirebaseConfig {
    public apiKey: string | undefined;
    public authDomain!: string;
    public databaseURL!: string;
    public projectId!: string;
    public messagingSenderId: string | undefined;
    public appId: string | undefined;

    constructor() {
        debugger;
        this.apiKey = process.env.REACT_APP_NOHAI_FIREBASE_API_KEY;
        this.messagingSenderId = process.env.REACT_APP_NOHAI_FIREBASE_MESSAGING_SENDER_ID;
        this.appId = process.env.REACT_APP_NOHAI_FIREBASE_APP_ID;
        this.authDomain = "nohai-pushnotification.firebaseapp.com";
        this.databaseURL = "https://nohai-pushnotification.firebaseio.com";
        this.projectId = "nohai-pushnotification";
    }
}

