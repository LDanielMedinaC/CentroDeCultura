import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';

import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private fa: AngularFireAuth, private router: Router) { 
      this.user = fa.authState;
      this.user.subscribe( (user) => {
        if(user){
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else{
          this.userDetails = null;
        }
      });
  }

  signInWithEmail(email, password){
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.fa.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    this.fa.auth.signOut()
    .then((res) => {
      this.router.navigate(['/']);
    });
  }

  isLoggedIn(){
    console.log(this.userDetails);
    if(this.userDetails == null){
      return false;
    }
    else{
      return true;
    }
  }

}
