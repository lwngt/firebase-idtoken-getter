# Firebase idToken getter

## Overview

This is the library to get the idToken from Firebase Authorization which you'd already set.<br>
If you want to get idToken of Firebase Authorization in Node.js project, you can get it easily.

![Firebase idToken getter](https://github.com/lwngt/firebase-idtoken-getter/raw/master/image.png)

## Caution

**I think you should keep idToken in secret.**<br>
**Because someone can access private information, if someone without you get your idToken.**<br>
**This library should be used in internal process like CI/CD.**

## How to use

### Sample code

```
// initial setting
const FirebaseTokenGetter = require("firebase-idtoken-getter");
let FirebaseTokenGetterObject = new FirebaseTokenGetter(
  "<-- JSON File for GOOGLE_APPLICATION_CREDENTIALS -->",
  "<-- User ID of Firebase Authorization -->",
  "<-- API key of Firebase -->",
  "<-- Project ID of Firebase Autorization -->"
);

// execute to get idToken
let getIdtoken = async () => {
  let token = await FirebaseTokenGetterObject.createIdTokenBycustomToken();
  console.log(token);
}
getIdtoken();
```

## Function

### (1) FirebaseTokenGetter.constractor

The function must be called at first.<br>

#### Argument

The function need 4 argument.

- credentialJson : It is for JSON File for `GOOGLE_APPLICATION_CREDENTIALS`. The file is a service account JSON file of GCP.
- firebaseUserId : It is User ID of Firebase Authorization. It is equivalent to [User UID of in the page](https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F38352772%2Fis-there-any-way-to-get-firebase-auth-user-uid&psig=AOvVaw1CnRyp7ucwwtupy72ZBmVg&ust=1603617959050000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCOC3r8n0zOwCFQAAAAAdAAAAABAD).
- apikey : It is Firebase's API key. You can see it [here](https://i.stack.imgur.com/AD9Em.png)
- projectId : It is Firebase's project id. You can see it [here](https://i.stack.imgur.com/AD9Em.png)

#### Process

Both `Firebase Admin SDK intialization` and `Firebase SDK initialization` are processed in this function.<br>

1. At First, `Firebase Admin SDK intialization` is processed by using a service account JSON file.<br>
2. Second, `Firebase SDK initialization` is processed by using both API key and Project ID of Firebase.

### (2) createIdTokenBycustomToken()

You can get idToken by calling this function.

#### Argument

Nothing.

#### Process

3 functions of firebase are processed in "createIdTokenBycustomToken()".<br>

1. At First, `admin.auth().createCustomToken` is processed. Firebase custom token is created by the function.<br>
2. Second, `firebase.auth().signInWithCustomToken` is processed. Firebase SDK is signined by the custom token.<br>
3. Last, `firebase.auth().currentUser.getIdToken(true).then((idToken)` is processed. User's idToken is generated.<br>

## Licence

Firebase idToken Getter<br>
Copyright (c) 2020 [Lichtwork.com](https://www.lichtwork.com)<br>
MIT License

