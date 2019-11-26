import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { LandingpageComponent as LandingpageAdminComponent} from './components/dashboard/landingpage/landingpage.component';
import { ActivitiesComponent as ActivitiesAdminComponent} from './components/dashboard/activities/activities.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
export const routes: Routes = [
	{
	    path: '',
	    component: LandingpageComponent
	},
	{
	    path: 'actividades',
	    component: ActivitiesComponent
	},
	{
	    path: 'login',
	    component: LoginComponent
	},
	{
	    path: 'admin/actividades',
		component: ActivitiesAdminComponent,
		canActivate: [AuthGuardService]
	},
	{
	    path: 'admin/pagina',
	    component: LandingpageAdminComponent,
		canActivate: [AuthGuardService]
	},
	{
	    path: '**',
	    component: LandingpageComponent
	}
];