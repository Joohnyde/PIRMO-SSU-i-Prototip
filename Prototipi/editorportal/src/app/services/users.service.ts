import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public errorMsg!: string;
  private baseURL = environment.apiUrl + 'users/';

  constructor(private http: HttpClient,
    private authService: AuthService,
  ) {

  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + "all", this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );

  }

  private getHttpTextOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        responseType: 'text',
        Authorization: 'Bearer ' + this.authService.getToken()
      })
    };

    return httpOptions;
  }

  private getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + this.authService.getToken()
      })
    };

    return httpOptions;
  }

  private getHttpOptionsParam(param: HttpParams) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken()
      }),
      params: param
    };

    return httpOptions;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        'Backend returned code ${error.status}, body was: ', error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
