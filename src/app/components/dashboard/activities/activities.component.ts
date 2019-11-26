import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Array<any>;
  name: string;
  description: string;
  date: string;
  hour: string;
  file : File;

  constructor(public firebaseService: FirebaseService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.name = '';
    this.description = '';
    this.date = '';
    this.hour = '';
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

  deleteActivity(activity){
    console.log('method')
    this.firebaseService.deleteActivity(activity.id)
    .then( (res) => {
      console.log('delete');
      this.firebaseService.getActivities()
      .subscribe( res => {
        console.log('get')
        this.activities = [];
        res.forEach((dca) => {
          let act = dca.payload.doc.data();
          act['id'] = dca.payload.doc.id;
          this.activities.push(act);
        })
      })
    })
    .catch((err) => {
      console.log('me mori')
      console.log(err);
    })
  }

  saveFile(files: FileList){
    this.file = files[0];
  }

  createActivity(){
    let fileName = this.name + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let newAct = {
      nombre: this.name,
      descripcion: this.description,
      fecha: this.date,
      hora: this.hour,
      img : ''
    }
    console.log('fileName: ' + fileName);
    let fileRef = this.storage.ref(fileName);
    fileRef.put(this.file)
    .then( (result) => {
      fileRef.getDownloadURL()
      .toPromise()
      .then((url) => {
        newAct.img = url;
        console.log(newAct);
        this.firebaseService.createActivity(newAct)
        .then((res) => {
          console.log(res);
          this.firebaseService.getActivities()
          .subscribe((acts) => {
            this.activities = [];
            acts.forEach((dca) => {
              let act = dca.payload.doc.data();
              act['id'] = dca.payload.doc.id;
              console.log(act);
              this.activities.push(act);
            })
            this.name = '';
            this.description = '';
            this.date = '';
            this.hour = '';
          })
        })
        .catch((err) => {
          console.log('me morí otra vez');
          console.log(err);
        })
      })
    });
  }

}
