import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaketesisComponent } from './maketesis/maketesis.component';

const routes: Routes = [
  { path: '', component: MaketesisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
