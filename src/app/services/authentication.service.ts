import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const TOKEN_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private storage: Storage, private plt: Platform) {}
 
  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    console.log(`Login in as ${email}`);
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  signupUser(email: string, password: string): Promise<any> {
    console.log(`Sign in as ${email}`);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email:string): Promise<void> {
    console.log(`Reset pass for ${email}`);
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    console.log(`Logout`);
    return firebase.auth().signOut();
  }
 
}
