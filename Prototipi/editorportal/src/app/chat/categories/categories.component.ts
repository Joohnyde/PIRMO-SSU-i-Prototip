import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GlobalVars } from 'src/app/GlobalVars';
import { CategoryShowcase } from 'src/app/models/categoryshowcase';
import { CategoriesService } from 'src/app/services/categories.service';

import categoryIzJsona from '../../../assets/json/categories.json';  
interface CategoryText{
  title: string;
  desc1: string;
  desc2: string;
  desc3: string;
  save: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChildren("myLab") 
  private myLab!: QueryList<ElementRef>;
  
  public content: CategoryText[] = categoryIzJsona;  

  public izBaze = new Array<String[]>;

  public stari: Array<String> = new Array<String>;

  public allCats!: CategoryShowcase[];

  public obradaUToku:boolean = false;

  constructor(public categoryService: CategoriesService){

    this.loadEmployees();
  }
  loadEmployees() {
    var data =  this.categoryService.GetCategoryShowcase();
    this.allCats = data;
    for(let red of this.allCats){
      var jedanRed = [red.kategorije[0].naziv,
      red.kategorije[1].naziv,
      red.kategorije[2].naziv];
      this.izBaze.push(jedanRed)
    }
    console.log("Eve ih iz baze:");
    console.log(this.izBaze);
  
  }

  public getLang():number{
    return parseInt(GlobalVars.selectedLang.toString());
  }
  

  ngOnInit(){
    if(this.myLab){
    for(var i = 0; i<this.myLab.length;i++){
      
    this.stari.push("");
    }}
  }
  isAllowed() {
    for(var i = 0; i<this.myLab.length;i++){
      if(this.myLab.get(i)?.nativeElement.textContent!=1){
        this.stari[i] = this.myLab.get(i)?.nativeElement.textContent;
      }
    }
  }




  sendNewCat(index:number):boolean{
    if(this.obradaUToku) return false;


    if(!this.myLab) return false;
    if(this.izBaze.length==0) return false;
    if(this.myLab.length>=(index+1)*3){
    for(var i = 0; i<3;i++){
      this.allCats[index].kategorije[i].naziv = this.myLab.get(index*3+i)?.nativeElement.textContent;

    }
    this.categoryService.PutCat(this.allCats[index]).subscribe((data) => {
      
    });alert("uspeh");
      window.location.reload();
    this.obradaUToku = true;
    }
    return true;
    
  }

  isButtonDisabled(index:number):boolean{
    if(this.obradaUToku) return false;
    if(!this.myLab) return false;
    if(this.izBaze.length==0) return false;
    if(this.myLab.length>=(index+1)*3){
    for(var i = 0; i<3;i++){
      if(this.myLab.get(index*3+i)?.nativeElement.textContent!==this.izBaze[index][i]){
       return true;
      }
    }
  }
    return false;
  }

  onNameChange(v:Event){
    for(var i = 0; i<this.myLab.length;i++){
      if(this.myLab.get(i)?.nativeElement.textContent==0){
        //console.log(this.stari[i]);
        var er = this.myLab.get(i);
        if(er)
        er.nativeElement.textContent = this.stari[i];
      }
    }

  }

}
