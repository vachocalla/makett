import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

import { AuthService }from '../../service/auth.service';

import { Router } from '@angular/router';

import { environment }from '../../environment';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {

  user = new FormGroup({
    username: new FormControl('vic@vic.com', Validators.required),
    password: new FormControl('123', Validators.required)
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.user.value)
    .subscribe({
      next: data => {
        console.log("LOGIN");
        console.log(data);
        
        this.cookieService.set( environment.idTokenName , data.access_token );
        this.authService.setCurrentUser( data.user );
        this.router.navigate(['/dashboard']);
      }, error: error => {
        console.log("error");
        console.log(error);
        
      }});
    
  }

}
