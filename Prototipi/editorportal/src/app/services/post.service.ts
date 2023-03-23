
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
    post1.naslovi=["Нове ФПГА плочице од Априла у просторијама рачунског центра УБГа"];
    post1.kategorije=["Хардвер"];

    var post2 = new PostShowcase();
    post2.boja="#ffcc00";
    post2.id="1ac175d7-8d71-43b3-b1f9-052b41680a01";
    post2.datum="2022-04-22";
    post2.naslovi=["Катедра за сигнале и системе коначно прешла на Пајтон (ОМГ)"];
    post2.kategorije=["Софтвер"];


    var post3 = new PostShowcase();
    post3.boja="#c2551e";
    post3.id="1ac17517-8d71-43d3-b1f9-052b41680a01";
    post3.datum="2023-05-25";
    post3.naslovi=["Чет ЏПТ 5 наводно у развоју код проф. Радивојевића"];
    post3.kategorije=["Интернет"];


    var post4 = new PostShowcase();
    post4.boja="#f2596b";
    post4.id="1ac175d2-8d71-43d3-b1f9-052b41680a01";
    post4.datum="2023-09-21";
    post4.naslovi=["У просторијама рачунског центра све се више 'гејмеује'. Управа побеснела!"];
    post4.kategorije=["Игре"];

    var post5 = new PostShowcase();
    post5.boja="#f2596b";
    post5.id="1ac175d6-8d71-43d3-b1f9-052b41680a01";
    post5.datum="2023-01-07";
    post5.naslovi=["Покренут дисциплински поступак против проф. Мишића. Варао у човече не љути се."];
    post5.kategorije=["Игре"];

    var post6 = new PostShowcase();
    post6.boja="#c2551e";
    post6.id="1ac17517-8d71-43d3-b1f9-052b41680a01";
    post6.datum="2023-03-08";
    post6.naslovi=["Асистент ударио на перспективни тим \"Пси\". \"Промјените име!\""];
    post6.kategorije=["Интернет"];

    return [post1,post2,post3,post4,post5,post6];
  }

  getPostContentById(id: number): string[] {
    if(id==parseInt("7d8f4a1e-c52e-4f4d-9edf-4d2fc0a21250")){
      return ["<h1>Флатер против Ријакт Нејтива у 2023. - Детаљна Анализа</h1>"+
      "<br>Флуттер и Реацт Нативе су два водећа алата за развој апликације на више платформи. Сазнајте више о њиховим разликама и најбољим случајевима употребе за сваки од њих.<br>"+
    "<img src='https://translate.google.com/website?sl=en&tl=sr&hl=sr&client=webapp&u=https://global-uploads.webflow.com/5c95072393140f36ecc22e60/6390bf4af43ebc3b8ce6f57d_1680x882howtoAproach2%2520(1)-p-1080.png' width=\"350px\"> <br>"+
    "<h1>Шта је Флуттер?</h1>"+
    "Флуттер је комплет за развој софтвера корисничког интерфејса (УИ) који је објавио Гоогле 2018. Флуттер вам омогућава да направите вишеплатформске апликације за бројне платформе и оперативне системе."+
    "<h1>Шта је Реацт Нативе?</h1>"+
    "Реацт Нативе је оквир за мобилни развој који је креирао Фацебоок и објављен 2015. Можете користити Реацт Нативе за развој мобилних, веб и десктоп апликација"+
    "<h1>Највећа разлика између Реацт Нативе-а и Флуттер-а</h1>"+
  "Флуттер приказује све компоненте на друштвеној плати.<br>Реацт Нативе трансформише ЈаваСцрипт компоненте у изворне.<br><br>Због тога <u>ажурирања компоненти</u> (на пример, иОС 16) немају никакав утицај на Флуттер апликације, али имају утицај на Реацт Нативе апликације.<br><br>"+
"У зависности од тога где стојите, ово може бити добра или лоша ствар. На пример, ако желите да ваше компоненте остану тачно онакве какве желите, Флуттер-ов приступ ће вас задовољити. Али ако желите да ваша апликација „сустигне“ најновије дизајне изворних компоненти, онда је Реацт Нативе прави начин – у Реацт Нативе ово ажурирање се дешава аутоматски и бесплатно. Такође, ако не желите да ваше компоненте у апликацији Реацт Нативе прате нови иОС дизајн (јер желите да задржите стил, на пример), можете искључити аутоматско ажурирање компоненти.<br><br>"+
"Али да бисте укључили најновије изворне компоненте у Флуттер, морате ручно да ажурирате апликацију.<br><br>"];
    }
    return ["Ово је тестни приказ <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">",
    "Ово је тестни приказ <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">",
    "Ово је тестни приказ <br> <img src='https://i.imgur.com/nQzIcJf.jpg' width=\"300px\"  height=\"200px\">"];
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