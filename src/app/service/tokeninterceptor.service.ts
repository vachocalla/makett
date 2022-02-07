import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environment';
import { Router } from '@angular/router';
import {catchError, retry, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

    constructor(
        private cookieService: CookieService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //let authReq = req;
        const token = this.cookieService.get(environment.idTokenName);
        if ( token ) {
          request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
        }
    
        return next.handle(request).pipe(
            catchError((err) => {
              if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.cookieService.delete(environment.idTokenName);
                    this.router.navigate(['signin']);
               }
            }
            return throwError(() => err);
          })
         );
        //return next.handle(request);

        /* return next.handle(request).pipe( tap(() => {},
          (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
             return;
            }
            this.router.navigate(['login']);
          }
        })); */
      }

    /* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = sessionStorage.getItem("access_token");
        if(accessToken)
        {
            request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
            });
        }
    
        return next.handle(request).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.router.navigate(['login']);
            }
          }
        });
      } */

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // All HTTP requests are going to go through this method
        const token = this.cookieService.get(environment.idTokenName);
        if (!token) {
            return next.handle(req);
        }
        const headers = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        //return next.handle(headers);
        return next.handle(headers);
    } */

    
}
