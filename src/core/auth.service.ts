import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null)

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
      this.afAuth.authState
        .switchMap(auth => {
          if (auth) {
            /// signed in
            var userObject =this.db.object('users/' + auth.uid).valueChanges();
            return userObject
          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(user => {
          this.user.next(user)
        })
    }

    ///// SingUp - User ////// 
    
    emailSignUp(email,password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
          .then(response =>{
            return 'User was created correctly';
          })
          .catch(error => {
            return Promise.reject(new Error('fail')).then(error);
          });
    } 
    ///// SignIn - SignOut Process /////

    emailLogin(email: string, password: string) {
        return this.afAuth.auth
          .signInWithEmailAndPassword(email, password)
          .then(credential =>  {
            this.updateUser(credential.user)
            return 'Ok';
          })
          .catch(error => {
            return Promise.reject(new Error('fail')).then(error);
         })
    }
      
    signOut() {
      this.afAuth.auth.signOut()
    }

    //// Update user data ////

    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateUser(authData) {
      const userData = new User(authData)
      const ref = this.db.object('users/' + authData.uid)
      ref.update(userData);
    }
}