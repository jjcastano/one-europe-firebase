import { FirebaseClient } from './firebase-client.js';

export class NotificationService {
  
  constructor( ) {
    this.canSend = false;
    this.client = new FirebaseClient();
    this.init();
  }

  init() {
    this.messaging = this.client.initMessaging();

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    this.messaging.getToken().then((currentToken) => {
      if ( currentToken ) {
        this.showToken( currentToken );
        this.sendTokenToServer(currentToken);
        this.updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        this.updateUIForPushPermissionRequired();
        this.setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      this.showToken('Error retrieving Instance ID token. ', err);
      this.setTokenSentToServer(false);
    });
    
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    this.messaging.onMessage((payload) => {
      alert( 'Message received. ' + payload );
    });

  }

  showToken( msg ) {
    console.log( msg );
  }

  setTokenSentToServer( canSend ) {
    this.canSend = canSend;
  }

  sendTokenToServer( token ) {
    // Do nothing
    if ( this.canSend ) {
      const headers = {
        Authorization: 'AIzaSyDBWxztsd3FaAuluMs-pwtvg0Edvu22ehY',
        details: true
      };
      fetch( `https://iid.googleapis.com/iid/info/${token}`, { headers } )
        .then( result => {
          debugger;
          console.log( result );
        } );
    }
  }

  updateUIForPushEnabled( token ) {
    // Do nothing
  }

  updateUIForPushPermissionRequired() {
    // Do nothing
  }
}
