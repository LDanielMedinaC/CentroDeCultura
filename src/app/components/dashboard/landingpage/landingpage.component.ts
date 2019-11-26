import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  lp: any
  fields: any;

  selectedField: any;
  file:  File;

  uploadPercent: Observable<number>;
  url: Observable<string>;
  uploading = false;

  constructor(public firebaseService: FirebaseService, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
    this.fields =  [
      {
        name: 'Logotipo',
        value: 'logotipo'
      },
      {
        name: 'Visión',
        value: 'imgVision'
      },
      {
        name: 'Misión',
        value: 'imgMision'
      },
      {
        name: 'Valores',
        value: 'imgValores'
      },
      {
        name: 'Resumen 1',
        value: 'imgResumen1'
      },
      {
        name: 'Resumen 2',
        value: 'imgResumen2'
      },
      {
        name: 'Resumen 3',
        value: 'imgResumen3'
      },
      {
        name: 'Resumen 4',
        value: 'imgResumen4'
      },
      {
        name: 'Resumen 5',
        value: 'imgResumen5'
      },
    ];
    this.firebaseService.getLandingPageWithID()
    .subscribe( res =>{
      this.lp = res[0].payload.doc.data();
      this.lp['id'] = res[0].payload.doc.id;
    })
  }

  setField(field){
    this.selectedField = field;
  }

  saveFile(files: FileList){
    this.file = files[0];
  }

  uploadImage(){
    this.uploading = true;
    let fileRef = this.storage.ref(this.selectedField);
    let task = fileRef.put(this.file);
    this.uploadPercent = task.percentageChanges();
    fileRef.getDownloadURL()
    .toPromise()
    .then((url) => {
      console.log('Ya???');
      console.log(url);
    })
    .catch((err) => {
      console.log('me morí');
      console.log(err);
    }) 
  }

  updateLP(){
    console.log(this.lp);
    console.log(this.lp.id);
    this.firebaseService.putLandingPage(this.lp, this.lp.id)
    .then( (res) => {
      this.router.navigate(['']);
    });
  }

}
