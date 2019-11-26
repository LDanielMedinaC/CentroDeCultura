import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Array<any>;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getActivities()
    .subscribe( res =>{
      this.activities = [];
      res.forEach((dca) => {
        let act = dca.payload.doc.data();
        act['id'] = dca.payload.doc.id;
        this.activities.push(act);
      })
    })
  }

}
