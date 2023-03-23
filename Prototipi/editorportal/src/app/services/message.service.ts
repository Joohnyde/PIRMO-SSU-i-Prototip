import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Message } from '../models/message';
import { from, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/service/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private server = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthService,) {
  }

  // getMessages(): Promise<Message[]> {
  //   return this.http.get<Message[]>(this.server+'/messages')
  //     .pipe(
  //       map((messages: Message[]) => messages.map(message => Promise.resolve({...message, date: new Date(message.date)}))())
  //     ).toPromise();
  // }


  public getMessages(selectedUserId: string): Observable<Message[]> {
    console.log(selectedUserId);
    return this.http.get<Message[]>(this.server+'messages/'+selectedUserId, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // send(message: { text: string; userId: string }): void {
  //   this.http.post(`${this.server}messages/new`, message).toPromise();
  // }

  public send(message: { text: string; userId: string }): Observable<any> {
    return this.http.post(`${this.server}messages/new`, message, this.getHttpOptions())
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
        Authorization: 'Bearer ' + this.authService.getToken()
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
