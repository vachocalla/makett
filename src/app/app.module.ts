import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CookieService } from 'ngx-cookie-service';
import { NgconfTaginputModule} from 'ngconf-taginput';
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokeninterceptorService } from './service/tokeninterceptor.service';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MaketesisComponent } from './make/maketesis/maketesis.component';
import { HeardernavComponent } from './heardernav/heardernav.component';
import { SinginComponent } from './auth/singin/singin.component';
import { SingupComponent } from './auth/singup/singup.component';
import { CreateprojectsetepsComponent } from './project/createprojectseteps/createprojectseteps.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HomeComponent } from './main/home/home.component';
import { CreatemodelprojectComponent } from './project/createmodelproject/createmodelproject.component';
import { CreatecontentComponent } from './project/createcontent/createcontent.component';
import { CreatemodelcontentComponent } from './project/createmodelcontent/createmodelcontent.component';
import { CreatestructprojectComponent } from './project/createstructproject/createstructproject.component';
import { CreateprojectComponent } from './project/createproject/createproject.component';
import { MakestructprojectComponent } from './make/makestructproject/makestructproject.component';


@NgModule({
  declarations: [
    AppComponent,
    MaketesisComponent,
    HeardernavComponent,
    SinginComponent,
    SingupComponent,
    CreateprojectsetepsComponent,
    DashboardComponent,
    HomeComponent,
    CreatemodelprojectComponent,
    CreatecontentComponent,
    CreatemodelcontentComponent,
    CreatestructprojectComponent,
    CreateprojectComponent,
    MakestructprojectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularEditorModule,
    NgconfTaginputModule,
    TagInputModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokeninterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
