import { Component, OnInit } from '@angular/core';

import { AuthService }from '../service/auth.service';
//import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-heardernav',
  templateUrl: './heardernav.component.html',
  styleUrls: ['./heardernav.component.scss']
})
export class HeardernavComponent implements OnInit {

  constructor(
    //private cookieService: CookieService,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  home(){
    if( this.authService.isLoggedIn() ){
      this.router.navigate(['/dashboard']);
    } else{
      this.router.navigate(['/']);
    }
  }

  cerrarSession(){
    this.authService.cerrarSesion();
  }

}
