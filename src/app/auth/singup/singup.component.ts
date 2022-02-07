import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment }from '../../environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  user = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cpassword: new FormControl('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    /* return this.http.post<any>(environment.API, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    ); */
    this.http.post<any>(
      environment.API+'/register', 
      { 
        user: 
          { username: this.user.value.username,
         
            name: this.user.value.name,
            lastname: this.user.value.lastname 
          },
        password: this.user.value.password
      }).subscribe({
        next: data => {
          console.log("data");
          console.log(data);
          // Messange notificacion
          this.router.navigate(['/signin']);
            /* this.postId = data.id; */
            /* {
              "data": {
                  "password": "123",
                  "user": {
                      "lastname": "user29010948",
                      "name": "user29010948",
                      "username": "user29010948"
                  }
              },
              "status": "success"
          } */
        },
        error: error => {
            /* this.errorMessage = error.message; */
            console.error('There was an error!', error);
        }
    })
  }

}
