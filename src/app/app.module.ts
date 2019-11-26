import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { LoginComponent } from './components/login/login.component';
import { LandingpageComponent as LandingpageAdminComponent } from './components/dashboard/landingpage/landingpage.component';
import { ActivitiesComponent as ActivitiesAdminComponent } from './components/dashboard/activities/activities.component';

import { RouterModule} from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './core/auth.service'
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingpageComponent,
    ActivitiesComponent,
    LoginComponent,
    LandingpageAdminComponent,
    ActivitiesAdminComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [FirebaseService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
