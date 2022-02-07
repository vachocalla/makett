import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from './../environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loading = false;
    currentUser: any;
    public dashboardStatus = 0;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
    ) { }

    isLoggedIn() {
        const cookieValue = this.cookieService.get(environment.idTokenName);
        if (cookieValue) {
            if (this.currentUser == undefined && !this.loading) {
                console.log("true TRUE");
                this.loading = true;
                this.http.post<any>(environment.API + '/getcurrentuser', {})
                    .subscribe({
                        next: data => {
                            this.loading = false;
                            this.currentUser = data.user;
                        }, error: error => {
                            this.loading = false;
                            console.log(error);
                        }
                    });

            }
            return true;
        } else {
            return false;
        }
    }

    login(user: any) {
        return this.http.post<any>(environment.API + '/login', user)
            .pipe(map(data => {
                return data;
            }));
    }
    
    cerrarSesion() {
        this.cookieService.delete(environment.idTokenName);
        this.currentUser = undefined;
        this.router.navigate(['/']);
    }

    setCurrentUser(user: any) {
        this.currentUser = user;
    }

    getCurrentUser() {
        if (this.currentUser != undefined) {
            return this.currentUser;
        }
        return undefined;
    }

    getAllow() {
        if (this.currentUser != undefined) {
            if (this.currentUser.role == 'admin') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

}
