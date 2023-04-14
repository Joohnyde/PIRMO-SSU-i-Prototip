import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CategoryShowcase } from '../models/categoryshowcase';
import { SimplifiedCategory } from '../models/simplifiedcategory';
import { AuthService } from '../auth/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // Base url
  baseurl = 'http://localhost:6969/api/category';
  constructor(private http: HttpClient,
    private authService: AuthService) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getToken()
    }),
  };
  // POST
  /*CreateBug(data): Observable<Bug> {
    return this.http
      .post<Bug>(
        this.baseurl + '/bugtracking/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetIssue(id): Observable<Bug> {
    return this.http
      .get<Bug>(this.baseurl + '/bugtracking/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }*/
  // GET
  GetAllCats(): String[][] {


    var kategorije:String[][] = [
      ["Hardver", "Softver", "Internet","Igrice"],
      ["Hardver", "Softver", "Internet","Igrice"],
      ["Hardver", "Softver", "Internet","Igrice"],];

    return kategorije;
    // return this.http
    //   .get<String[][]>(this.baseurl + '/all/')
    //   .pipe(retry(1), catchError(this.errorHandl));
  }
  
  GetCategoryShowcase(): CategoryShowcase[] {
    var hardver = new CategoryShowcase();
    hardver.boja = "#800000";
    hardver.kategorije = [];
    var sHardver1 = new SimplifiedCategory();
    sHardver1.pid = "15656e54-4d95-416a-be31-1bffcddc2381";
    sHardver1.naziv = "Hardver";
    hardver.kategorije.push(sHardver1);
    hardver.kategorije.push(sHardver1);
    hardver.kategorije.push(sHardver1);

    var softver = new CategoryShowcase();
    softver.boja = "#ffcc00";
    softver.kategorije = [];
    var sSoftver1 = new SimplifiedCategory();
    sSoftver1.pid = "15116e54-4d95-416a-be31-1bffcddc2381";
    sSoftver1.naziv = "Softver";
    softver.kategorije.push(sSoftver1);
    softver.kategorije.push(sSoftver1);
    softver.kategorije.push(sSoftver1);

    
    var internet = new CategoryShowcase();
    internet.boja = "#c2551e";
    internet.kategorije = [];
    var sInternet1 = new SimplifiedCategory();
    sInternet1.pid = "15656e54-aa95-416a-be31-1bffcddc2381";
    sInternet1.naziv = "Internet";
    internet.kategorije.push(sInternet1);
    internet.kategorije.push(sInternet1);
    internet.kategorije.push(sInternet1);

    var igrice = new CategoryShowcase();
    igrice.boja = "#f2596b";
    igrice.kategorije = [];
    var sIgrice1 = new SimplifiedCategory();
    sIgrice1.pid = "15116e54-4d95-416a-be31-1aafcddc2381";
    sIgrice1.naziv = "Igrice";
    igrice.kategorije.push(sIgrice1);
    igrice.kategorije.push(sIgrice1);
    igrice.kategorije.push(sIgrice1);


    
    var rez: CategoryShowcase[] = [hardver,softver,internet,igrice];
    return rez;
  }
  PutCat(data: CategoryShowcase): Observable<string> {


    return this.http
      .put<string>(
        this.baseurl + '/put',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.errorHandl));
  }
  // PUT
  /*UpdateBug(id, data): Observable<Bug> {
    return this.http
      .put<Bug>(
        this.baseurl + '/bugtracking/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  DeleteBug(id) {
    return this.http
      .delete<Bug>(this.baseurl + '/bugtracking/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // Error handling
  */errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}