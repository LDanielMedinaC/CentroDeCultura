import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  pass: String;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  setEmail(){
    
  }

  logIn(){
    this.auth.signInWithEmail(this.email, this.pass)
    .then((res) => {
      console.log(res);
      this.router.navigate(['/']);
    })
    .catch((err) => {
      console.log('error: ' + err);
    })
  }

}
