import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'
import { NoauthGuard } from './noauth.guard'

import { HomeComponent } from './main/home/home.component';
import { MaketesisComponent } from './make/maketesis/maketesis.component';
import { MakestructprojectComponent } from './make/makestructproject/makestructproject.component';
import { SinginComponent } from './auth/singin/singin.component';
import { SingupComponent } from './auth/singup/singup.component';
import { CreateprojectsetepsComponent } from './project/createprojectseteps/createprojectseteps.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [NoauthGuard]  },
  { path: 'signin', component: SinginComponent, canActivate: [NoauthGuard] },
  { path: 'signup', component: SingupComponent, canActivate: [NoauthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'steps', component: CreateprojectsetepsComponent, canActivate: [AuthGuard]  },
  { path: 'makedocument/:id', component: MaketesisComponent, canActivate: [AuthGuard] },
  { path: 'makestructdocument/:id', component: MakestructprojectComponent, canActivate: [AuthGuard] }
  // { path: 'product/:id/:id1/:id2', component: ProductDetailComponent }
  // <a [routerLink]="['/Product', ‘2’]">{{product.name}} </a>

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
