import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  lp: any;
  
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getLandingPageInfo()
    .subscribe( res =>{
      this.lp = res[0];
      console.log(this.lp);
    })
  }

}
