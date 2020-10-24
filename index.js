'use strict';

let admin = require('firebase-admin');
var firebase = require("firebase/app");
require("firebase/auth");

// Global variables
let userId = "";
let additionalClaims = {
  premiumAccount: true
};

// set environment variables
process.env.GOOGLE_APPLICATION_CREDENTIALS = "";

class FirebaseTokenGetter {

  constructor(credentialJson, firebaseUserId, apikey, projectId) {
    if (credentialJson === null) {
      throw Error('no credential json file');
    }
    if (firebaseUserId === null) {
      throw Error('no firebase user id');
    }
    if (apikey === null) {
      throw Error('no api key');
    }
    if (projectId === null) {
      throw Error('no project id');
    }
    // service account setting
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialJson;
    userId = firebaseUserId;

    // admin authorizaion
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });

    // firebaes initializaion
    let config = {
      apiKey: apikey,
      authDomain: projectId + ".firebaseapp.com"
    };
    firebase.initializeApp(config);
  }

  async createIdTokenBycustomToken() {
    // execute get custom token
    let customTokenResult = await this.getCustomToken(userId, additionalClaims);
    if (customTokenResult === null) {
      throw Error('failed to get custom token from firebase.');
    }

    // execute autorization with custom token
    let executeResult = await this.executeAuthorization(customTokenResult);
    if (executeResult !== true) {
      throw Error('failed to execute firebase signin with custom token.');
    }

    // execute getId token
    let idTokenResult = await this.getIdToken();
    if (idTokenResult === null) {
      throw Error('failed to get idToken.');
    }
    return idTokenResult;
  }

  // get custom token
  getCustomToken(userId, additionalClaims) {
    return new Promise((resolve, reject) =>
      admin.auth().createCustomToken(userId, additionalClaims)
        .then(function (customToken) {
          resolve(customToken);
          return;
        })
        .catch(function (error) {
          reject(null);
          return;
        })
    );
  }

  // login by custom token
  executeAuthorization(customToken) {
    return new Promise((resolve, reject) =>
      firebase.auth().signInWithCustomToken(customToken)
        .then(function () {
          resolve(true);
          return;
        }).catch(function (error) {
          reject(false);
          return;
        })
    );
  }

  // get Id token
  getIdToken() {
    return new Promise((resolve, reject) =>
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        resolve(idToken);
      }).catch((error) => {
        reject(null);
      })
    );
  }
}

module.exports = FirebaseTokenGetter;
module.exports.default = FirebaseTokenGetter;
