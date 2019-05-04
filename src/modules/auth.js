
class Auth {
  

  initiateAuthScript() {
      // Downloads oauth.js from CDN, pretty much like adding external scripts
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  };
    // Initializes OAuth.io with API key
  authenticateUser() {
    window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");

    window.OAuth.popup("spotify", { cache: true }).done(spotify => {
      sessionStorage.setItem("access_token", spotify.access_token);
      this.access_token = spotify.access_token
      spotify.me().then(data => {
        sessionStorage.setItem("username", data.name);
        this.userName = data.name
      })
    })
  }

  getAccessToken() {
    return this.accessToken;
  }
  
  getUserName() {
    return this.userName
  }

  localLogout() {
    sessionStorage.clear();
    localStorage.clear();
  }

}

const auth = new Auth();

export default auth;