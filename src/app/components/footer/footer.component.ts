import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  lp: any;
  isLogged: boolean;

  constructor(public firebaseService: FirebaseService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.getLandingPageInfo()
    .subscribe( res =>{
      this.lp = res[0];
      this.isLogged = this.auth.isLoggedIn();
    })
  }

  logOut(){
    this.auth.signOut();
    this.router.navigate(['']);
  }

}
