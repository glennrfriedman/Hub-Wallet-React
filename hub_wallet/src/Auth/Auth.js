// create service to manage and coordinate user auth

// login method that calls the authorize method from auth0.js

import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'hubwallet.auth0.com',
    clientID: 'ZrLh5fw0gcOOm3KCEWSgqCjZzw0ast9i',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://hubwallet.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}