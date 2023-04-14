import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycloakProfile } from 'node_modules/keycloak-js';
import { AuthService } from 'src/app/auth/service/auth.service';
import { GlobalVars } from '../../GlobalVars';
import { CategoriesService } from '../../services/categories.service';
import { ViewportScroller } from "@angular/common";
import headerIzJsona from '../../../assets/json/header.json';  
import { Router,NavigationEnd  } from '@angular/router';
import {formatDate} from '@angular/common';
import { View } from 'jodit/types/modules';
import { DatePickerComponent, FocusEventArgs } from '@syncfusion/ej2-angular-calendars';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { PostShowcase } from 'src/app/models/postshowcase';
import { MessageComponent } from 'src/app/chat/message/message.component';
interface HeaderText{

   hello: string ;
   welcome: string ;
   choosecattitle: string ;
   choosecatdesc: string ;
   search: string ;
   logout: string ;
   menuitem1: string ;
   menuitem2: string;
   addNew: string;
   import: string;

}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @ViewChild('pretraga') 
  input: any; 

  @ViewChild('default')
  public datepickerObj!: DatePickerComponent ;

  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  public userProfileImage!: string;
  
  public content: HeaderText[] = headerIzJsona;  
  public static kategorije: any = [];
  public static hc : HeaderComponent;
  public currentRoute: string = "";
  private router: Router | undefined;
  public srch:string = "";
  constructor(public dialog: MatDialog, private authService: AuthService,private _router: Router, public categoryService: CategoriesService,
    private scroller: ViewportScroller
    // private userProfileService: UserProfileService
    ) { 
      HeaderComponent.hc = this;
      this.router=_router;
      this.loadEmployees();
    }


  public static getSrch(){
    return this.hc.srch;
  }
  onFocus(): void {
    this.datepickerObj.show();
}

  onNameChange(v:Event){
    this.srch = this.input.nativeElement.value;
    console.log("Novo["+this.srch+"]");
    
    /*for(var i = 0; i<this.myLab.length;i++){
      if(this.myLab.get(i)?.nativeElement.textContent==0){
        //console.log(this.stari[i]);
        var er = this.myLab.get(i);
        if(er)
        er.nativeElement.textContent = this.stari[i];
      }
    }*/

  }


  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
      // this.getProfileImage();
    }

  }

  async setAddMode(){ 
    GlobalVars.addMode = true; 
    this.srch=""
    this.scroller.scrollToAnchor("finiSmooth");
    await new Promise(f => setTimeout(f, 50));
    this.scroller.scrollToAnchor("finiSmooth");
  }
  removeAddMode(){GlobalVars.addMode = false; 
    this.srch=""}

  loadEmployees() {
    var data = this.categoryService.GetAllCats();
    HeaderComponent.kategorije = data;
    GlobalVars.kategorije = data;

  }

  public importSadrzaj(){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(DialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){

        var kopirani = new PostShowcase();
        kopirani.id="7d8f4a1e-c52e-4f4d-9edf-4d2fc0a21250";
        kopirani.naslovi=["Флатер против Ријакт Нејтива у 2023. - Детаљна Анализа"];
        kopirani.kategorije=["Софтвер"];
        kopirani.boja="#ffcc00";

        const now = Date.now();
        const format = 'yyyy-MM-dd';
        const locale = 'en-US';
        const formattedDate = formatDate(now, format, locale);
        
        kopirani.datum=formattedDate;

        MessageComponent.hc.setSelectedForEditing(kopirani);
      }
    });
  }

  public getLang():number{
    return parseInt(GlobalVars.selectedLang.toString());
  }
  
  public getCatFilInd():number{
    return parseInt(GlobalVars.categoryFilterIndex.toString());
  }

  public email(): string | undefined{
    return this.userProfile.email;
  }

  public visibleSearch():boolean{
   // if(!this.router?.url.includes("categories")) return "flex";
   // return "none";
   return !this.router?.url.includes("categories");
  }

  public setLang(broj : number): void{
    GlobalVars.selectedLang = <Object>broj;
  }

  public setCatFilt(broj: Object): void{
    GlobalVars.categoryFilter = broj;
    if(broj == 0) GlobalVars.categoryFilterIndex = 0;
    else{
      GlobalVars.categoryFilterIndex = HeaderComponent.kategorije[this.getLang()].indexOf(broj.toString());
    }
  }

  public getCatTitle(): string{
    if(GlobalVars.categoryFilter==0) return this.content[this.getLang()].choosecattitle;
    return HeaderComponent.kategorije[this.getLang()][this.getCatFilInd()];
  }

  public getBG(broj : number): boolean{
    if(parseInt(GlobalVars.selectedLang.toString()) === broj) return true;
    return false;
  }

  public getCatForLang(): string[]{
    return HeaderComponent.kategorije[this.getLang()];
  }


  public username(): string | undefined{
    return this.userProfile.username;
  }

  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }

  // public getProfileImage():void {
  //   this.userProfileService.getUserProfileImage().subscribe((response) => {
  //     this.userProfileImage = response.profileImage;
  //   });
  // }
}
