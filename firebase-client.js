import { config } from './config.js';

export class FirebaseClient {

  constructor( ) {
    // Init firebase
    this.initFirebase( );
    // Init messaging
    this.initMessaging( );
/*
    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then( refreshedToken => {
          console.log('Token refreshed.');
          // Indicate that the new Instance ID token has not yet been sent to the app server.
          setTokenSentToServer(false);
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
          // ...
        }).catch((err) => {
          console.log('Unable to retrieve refreshed token ', err);
          showToken('Unable to retrieve refreshed token ', err);
        });
    });
*/
  }

  initFirebase( ) {
    // Initialize Firebase
    firebase.initializeApp( config.firebase );
  }

  initMessaging( ) {
    if( ! this.messaging ) {
      // Retrieve Firebase Messaging object.
      this.messaging = firebase.messaging();
      // Add the public key generated from the console here.
      this.messaging.usePublicVapidKey( config.apiKey );
    }
    return this.messaging;
  }

  getToken() {
    // Get Instance ID token. Initially this makes a network call, once retrieved subsequent calls to getToken will return from cache.
    messaging.getToken()
      .then( currentToken => {
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
      });
  }

}
