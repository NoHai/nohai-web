declare var window: any;
declare var FB: any;

export default class FacebookHelper {
    public static Init() {
        window.fbAsyncInit = function() {
            FB.init({
                appId: '824817741217116',
                cookie: true,
                xfbml: true,
                version: 'v3.3',
            });

            FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
            if (fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        })(document, 'script', 'facebook-jssdk');
    }
}
