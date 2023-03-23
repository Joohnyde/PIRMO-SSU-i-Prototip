import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Stomp } from '@stomp/stompjs';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { Editor } from 'ngx-editor';
import { ViewportScroller } from "@angular/common";

import { GlobalVars } from '../../GlobalVars';
import postoviIzJsona from '../../../assets/json/posts.json';  
import wssimulacija from '../../../assets/json/wssim.json';  
import { PostService } from 'src/app/services/post.service';
import { PostShowcase } from 'src/app/models/postshowcase';
import { AuthService } from 'src/app/auth/service/auth.service';
import { KeycloakProfile } from 'keycloak-js';
import { FormComponent } from '../form/form.component';
import { HeaderComponent } from 'src/app/header/header/header.component';

interface PostsText{

  poststitle:string;
  postsdesc1:string;
  postsdesc2:string;
  postsdesc3:string;
  tabhead1:string;
  tabhead2:string;
  tabhead3:string;

}


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  public mjeseci: string[][] = [
    ["Јануар","Фебруар","Март","Април","Мај","Јун","Јул","Август","Септембар","Октобар","Новембар","Децембар"],
    ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],
    ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht","Tetor", "Shtator", "Nëntor", "Dhjetor"]
  ];
  public usersList: User[] = [];
  public styleActive: string = "list-group-item list-group-item-action list-group-item-light rounded-0";
  public selectedIndex: any;
  public selectedUser!: User;

  @ViewChild('messageInput')
  public messageInput!: ElementRef;

  public static hc : MessageComponent;
  public messages: Message[] = [];
  public name = new UntypedFormControl('');
  public ws: any;

  public formc !: FormComponent;

  loggedIn: boolean = false;
  userProfile: KeycloakProfile = {};

  public content: PostsText[] = postoviIzJsona;  
  public postovi: any = [];
  
  public selectedForEditing!: PostShowcase | null;  

  constructor(
    private authService: AuthService,
    public userService: UsersService,
    public postService: PostService,
    private messageService: MessageService,
    private scroller: ViewportScroller) {   
      MessageComponent.hc = this;
     }

  ngOnInit(): void {
    this.getAllUsers();
    this.selectedForEditing = null;
    this.loadPosts();
  }

  async loadPosts() {
    this.loggedIn = await this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
      // this.getProfileImage();
    }



    console.log(this.userProfile.username);
    
    this.postovi = this.postService.GetAuthorsPosts(this.userProfile.username);
  }
  public getUsername():string{
  return this.userProfile.username?this.userProfile.username:"";
  }

  

  public async setSelectedForEditing(novi:PostShowcase):Promise<void>{
    GlobalVars.addMode = false;
    if(this.selectedForEditing != novi){
      this.selectedForEditing = novi;
      this.scroller.scrollToAnchor("finiSmooth");
      await new Promise(f => setTimeout(f, 50));
      this.scroller.scrollToAnchor("finiSmooth");
    }
    else
      this.selectedForEditing = null;
    console.log(this.selectedForEditing?.naslovi);
    console.log(this.isSelectedForEditing());
    this.formc.bpost.refresh(this.selectedForEditing);
  }

  public isSelectedForEditing():boolean{
    return this.selectedForEditing === null && GlobalVars.addMode == false;
  }


  public getParsedDatum(unparsed: string):string{
    var datum = new Date(unparsed); //YYYY-MM-dd
    return datum.getDate()+". "+this.mjeseci[this.getLang()][datum.getMonth()]+" "+datum.getFullYear()+"."
    
  }

  public postTitleValidation(post:PostShowcase,naslov: string):boolean{
    for(let n of post.naslovi){
      if(n.length!=0 && n.includes(naslov))
      return true;
    }
    return false;
  }

  public getFiltered(): PostShowcase[]{
    var rez: PostShowcase[] = [];
    for(let post of this.postovi){
      if(GlobalVars.categoryFilter === 0 || post.kategorije.includes(GlobalVars.categoryFilter.toString())){
        if(HeaderComponent.getSrch() == "" || this.postTitleValidation(post, HeaderComponent.getSrch()))
        rez.push(post);
      }
   }
    return rez;
  }

  private getAllUsers() {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.usersList = response;
      //console.log(this.usersList);
      // this.selectedUser = this.usersList[0];
      // this.connect();
      // this.messageService.getMessages().subscribe((response) => {
      //   this.messages = response;
      // });
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.messageInput.nativeElement.focus());
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
  public getLang():number{
    return parseInt(GlobalVars.selectedLang.toString());
  }

  public selectUser(user: User, index: any) {
    this.selectedIndex = index;
    this.selectedUser = user;
    this.disconnect();
    this.connect();
    this.messageService.getMessages(this.selectedUser.id).subscribe((response: Message[]) => {
      this.messages = response;
    });
  }

  public setActiveCSS(index: number): string {
    if (index === this.selectedIndex) {
      return "list-group-item list-group-item-action active text-white rounded-0";
    } else {
      return "list-group-item list-group-item-action list-group-item-light rounded-0";
    }
  }

  public connect() {
    let socket = new WebSocket(environment.webSocket);
    this.ws = Stomp.over(socket);
    this.ws.connect({}, () => {
      this.ws.subscribe('/chat', (frame: { body: string }) => {
        const message: Message = JSON.parse(frame.body);
        this.messages.push({ ...message, date: new Date(message.date) });

        this.selectedUser.lastMessage = message.text;
      });
    }, (error: any) => {
      alert('STOMP error ' + error);
    });
  }

  public disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    console.warn('Disconnected');
  }
  public send() {
    const message = new Message();

    // this.messageService.send({
    //   text: this.name.value,
    //   userId: this.selectedUser.id
    // });

    this.messageService.send({
      text: this.name.value,
      userId: this.selectedUser.id
    }).subscribe((resault: any) => {
      this.name.setValue('');
    });



  }

  public isToday(date: Date) {
    const today = new Date();
    return date.getDate() == today.getDate()
      && date.getMonth() == today.getMonth()
      && date.getFullYear() == today.getFullYear();
  }

  // isCurrentUser(userId: string) {
  //   return userId === this.selectedUser.id;
  // }
  public isCurrentUser(userId: string): boolean {
    if (userId === this.selectedUser.id) {
      return true;
    } else {
      return false;
    }
  }

}
