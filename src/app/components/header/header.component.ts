import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  lp: any;
  isLogged: boolean;

  public menuIsOpen: boolean = false;

  constructor(public firebaseService: FirebaseService, private auth: AuthService) { }

  ngOnInit() {
    this.firebaseService.getLandingPageInfo()
    .subscribe( res =>{
      this.lp = res[0];
      this.isLogged = this.auth.isLoggedIn();
    })
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  closeMenu() {
    this.menuIsOpen = false;
  }

}
