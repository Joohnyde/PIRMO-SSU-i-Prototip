
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PostShowcase } from '../models/postshowcase';
import { BPost } from '../models/bpost';
import { AuthService } from '../auth/service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // Base url
  baseurl = 'http://localhost:6969/api/posts';
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
  GetAuthorsPosts(author: string | undefined): PostShowcase[] {
    var post1 = new PostShowcase();
    post1.boja="#800000";
    post1.id="1ac175d7-8d71-43d3-b1f9-052b41680a01";
    post1.datum="2022-12-13";
    post1.naslovi=["Nove FPGA pločice od Aprila u prostorijama računskog centra UBGa"];
    post1.kategorije=["Hardver"];

    var post2 = new PostShowcase();
    post2.boja="#ffcc00";
    post2.id="1ac175d7-8d71-43b3-b1f9-052b41680a01";
    post2.datum="2022-04-22";
    post2.naslovi=["Katedra za signale i sisteme konačno prešla na Python (OMG)"];
    post2.kategorije=["Softver"];


    var post3 = new PostShowcase();
    post3.boja="#c2551e";
    post3.id="1ac17517-8d71-43d3-b1f9-052b41680a01";
    post3.datum="2023-05-25";
    post3.naslovi=["ChatGPT 5 navodno u razvoju kod prof. Radivojevića"];
    post3.kategorije=["Internet"];


    var post4 = new PostShowcase();
    post4.boja="#f2596b";
    post4.id="1ac175d2-8d71-43d3-b1f9-052b41680a01";
    post4.datum="2023-09-21";
    post4.naslovi=["U prostorijama računskog centra sve se više 'gejmuje'. Uprava pobesnela!"];
    post4.kategorije=["Igrice"];

    var post5 = new PostShowcase();
    post5.boja="#f2596b";
    post5.id="1ac175d6-8d71-43d3-b1f9-052b41680a01";
    post5.datum="2023-01-07";
    post5.naslovi=["Pokrenut disciplinski postupak protiv prof. Mišića. Varao u čoveče ne ljuti se."];
    post5.kategorije=["Igrice"];

    var post6 = new PostShowcase();
    post6.boja="#c2551e";
    post6.id="1ac17517-8d71-43d3-b1f9-052b41680a01";
    post6.datum="2023-03-08";
    post6.naslovi=["Asistent udario na perspekticni tim \"Psi\". \"Promjenite ime!\""];
    post6.kategorije=["Internet"];

    return [post1,post2,post3,post4,post5,post6];
  }

  getPostContentById(id: number): string[] {
    if(id==parseInt("7d8f4a1e-c52e-4f4d-9edf-4d2fc0a21250")){
      return ["<h1>Flater protiv Rijakt Nejtiva u 2023. - Detaljna Analiza</h1>"+
      "<br>Flutter i React Native su dva vodeća alata za razvoj aplikacije na više platformi. Saznajte više o njihovim razlikama i najboljim slučajevima upotrebe za svaki od njih.<br>"+
    "<img src='https://translate.google.com/website?sl=en&tl=sr&hl=sr&client=webapp&u=https://global-uploads.webflow.com/5c95072393140f36ecc22e60/6390bf4af43ebc3b8ce6f57d_1680x882howtoAproach2%2520(1)-p-1080.png' width=\"350px\"> <br>"+
    "<h1>Šta je Flutter?</h1>"+
    "Flutter je komplet za razvoj Softvera korisničkog interfejsa (UI) koji je objavio Google 2018. Flutter vam omogućava da napravite višeplatformske aplikacije za brojne platforme i operativne sisteme."+
    "<h1>Šta je React Native?</h1>"+
    "React Native je okvir za mobilni razvoj koji je kreirao Facebook i objavljen 2015. Možete koristiti React Native za razvoj mobilnih, veb i desktop aplikacija"+
    "<h1>Najveća razlika između React Native-a i Flutter-a</h1>"+
  "Flutter prikazuje sve komponente na društvenoj plati.<br>React Native transformiše JavaScript komponente u izvorne.<br><br>Zbog toga <u>ažuriranja komponenti</u> (na primer, iOS 16) nemaju nikakav uticaj na Flutter aplikacije, ali imaju uticaj na React Native aplikacije.<br><br>"+
"U zavisnosti od toga gde stojite, ovo može biti dobra ili loša stvar. Na primer, ako želite da vaše komponente ostanu tačno onakve kakve želite, Flutter-ov pristup će vas zadovoljiti. Ali ako želite da vaša aplikacija „sustigne“ najnovije dizajne izvornih komponenti, onda je React Native pravi način – u React Native ovo ažuriranje se dešava automatski i besplatno. Takođe, ako ne želite da vaše komponente u aplikaciji React Native prate novi iOS dizajn (jer želite da zadržite stil, na primer), možete isključiti automatsko ažuriranje komponenti.<br><br>"+
"Ali da biste uključili najnovije izvorne komponente u Flutter, morate ručno da ažurirate aplikaciju.<br><br>"];
    }
    return ["Ovo je testni prikaz <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">",
    "Ovo je testni prikaz <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">",
    "Ovo je testni prikaz <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">"];
  }

  // PUT
  PutBPost(data: BPost): Observable<string> {
    //tok = this.authService.getToken()
    console.log("Token:"+this.authService.getToken());
    var posta = data.postService;
    data.postService = null;
    var da = JSON.stringify(data);
    data.postService = posta
    console.log("Data:"+da);
    
    
    return this.http
      .put<string>(
        this.baseurl + '/put',
        da,
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.errorHandl));
  }/*
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