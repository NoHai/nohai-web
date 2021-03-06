declare var window: any;
declare var FB: any;

export default class FacebookHelper {
  public static Init() {
    if (!!process.env.REACT_APP_FACEBOOK_APP_ID) {
      window.fbAsyncInit = function() {
        if (!!FB) {
          FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v3.3',
          });

          FB.AppEvents.logPageView();
        }
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
}
