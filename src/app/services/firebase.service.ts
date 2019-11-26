import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}

    getLandingPageInfo(){
        return this.db.collection('/landingpages').valueChanges();
    }

    getLandingPageWithID(){
        return this.db.collection('/landingpages').snapshotChanges();
    }

    putLandingPage(lp, id){
        delete lp.id;
        return this.db.collection('/landingpages').doc(id).update(lp);
    }

    getActivities(){
        return this.db.collection('/activities').snapshotChanges();
    }

    createActivity(act){
        return this.db.collection('/activities').add(act);
    }

    deleteActivity(id){
        return this.db.collection('/activities').doc(id).delete();
    }
}
