
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalVars } from '../../GlobalVars';
import { HeaderComponent } from '../../header/header/header.component';
import formIzJsona from '../../../assets/json/form.json';
import { PostShowcase } from 'src/app/models/postshowcase';
import { MessageComponent } from '../message/message.component';
import { BPost } from 'src/app/models/bpost';
import { PostService } from 'src/app/services/post.service';

import { FormGroup, FormControl, Validators as FormValidator, AbstractControl, FormBuilder } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';

import { FilePickerDirective } from './file-picker.directive';
// import { NgxImageCompressService } from 'ngx-image-compress';
import compress from 'compress-base64';
import { Router } from '@angular/router';
interface FormText {
  formDesc: string[];
  title: string;
  category: string;
  thumbnail: string;
  upload: string;
  save: string;
  cancel: string;
  select: string;
  opis: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,OnDestroy {



  @Input()
  public autor: String = "";

  @Input()
  public post!: PostShowcase | null;
  @Input()
  public msgComp!: MessageComponent;

  public bpost!: BPost;

  public naslovi: string[] = ["Нова објава", "Nova objava", "Njoftim i ri"];

  public content: FormText[] = formIzJsona;
  public obradaUToku: boolean = false;
  public jezici: string[] = ['Crnogorski', 'Bosanski', 'Shqipja'];

  @Input()
  public kategorije: string[][] = HeaderComponent.kategorije;

  public bozePrevedi():number{
   return this.contentEditedLang;
  }

  public mneEditor!: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public contentEditedLang: number = this.getLang();
  public getContentEditingLang(): string {
    //console.log( this.jezici[this.contentEditedLang]);
    return this.jezici[this.contentEditedLang];
  }
  public getLang(): number {
    return parseInt(GlobalVars.selectedLang.toString());
  }
  public mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  public savePostForLang() {
    //exampleInputUsername1
    //this.bpost.sadrzaji[this.contentEditedLang] = this.mneEditor;

  }
  onKey(event: any) { const inputValue = event.target.value; this.bpost.naslovi[this.contentEditedLang] = inputValue; }
  public nextPage(): void {
    this.savePostForLang();
    this.contentEditedLang = this.mod(this.contentEditedLang + 1, 3);
    console.log(this.bpost);
  }
  public prevPage(): void {
    this.savePostForLang();
    this.contentEditedLang = this.mod(this.contentEditedLang - 1, 3);
    console.log(this.bpost);
  }
  public getCats(): string[] {
    return this.kategorije[this.contentEditedLang];
  }

  onOptionsSelected(value: number) {
    this.bpost.kategorije = value;
  }

  public otkazi() {
    if (this.post != null) { this.msgComp.setSelectedForEditing(this.post); console.log('Radi'); }
    else { GlobalVars.addMode = false; }
  }

  ngOnInit() {
    this.mneEditor = new Editor();
    this.msgComp.formc = this;
    this.bpost = new BPost(this.post,this.postService);

    
    console.log("--------")
    console.log(this.bpost);
    console.log("--------")
  }

  ngOnDestroy(): void {
    this.mneEditor.destroy();
  }
  public getFile(): string {
    if (this._selectedFiles.length == 0) {
      return "";
    }
    return this._selectedFiles[0].name;
  }

  constructor(private router: Router,
    private postService: PostService | null
    // , public imageCompress: NgxImageCompressService
  ) { }

/*
  loadPostContent(id : number) {
    return this.postService.getPostContentById(id).subscribe((data) => {
      this.allCats = data;
      for(let red of this.allCats){
        var jedanRed = [red.kategorije[0].naziv,
        red.kategorije[1].naziv,
        red.kategorije[2].naziv];
        this.izBaze.push(jedanRed)
      }
      console.log("Eve ih iz baze:");
      console.log(this.izBaze);
    })
  }
*/
  public allGood(): boolean {
    console.log(this.bpost);
    
    return this.bpost.naslovi[0].length != 0 &&
      this.bpost.naslovi[1].length != 0 &&
      this.bpost.naslovi[2].length != 0 &&
      !(this.bpost.naslovnica.length == 0 && this.bpost.id == -1)
      && this.bpost.sadrzaji[0].length>7 && this.bpost.sadrzaji[1].length>7 && this.bpost.sadrzaji[2].length>7;
  }

  public salji() {
    // if (!this.allGood()) alert("Morate popuniti sadrzaj i naslove na svim jezicima kao i dodati naslovnicu");
    // else {
      if (!this.obradaUToku) {
        this.obradaUToku = true;
        this.savePostForLang();
        // if(this.postService)
        // this.postService.PutBPost(this.bpost).subscribe((data: {}) => {
        // });
        
        alert("Uspesna izmena");
        this.router.navigate(['/']);

        window.location.reload();
      }
    // }

    //PutBPostString
  }











  _selectedFiles: any = [];
  _multiple = false;

  @ViewChild('buttonPicker', { static: true })
  _buttonPicker!: FilePickerDirective;

  @ViewChild('dropZonePicker', { static: true })
  _dropZonePicker!: FilePickerDirective;


  async _onFilesChanged(files: FileList) {
    this._selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this._selectedFiles.push(files[i]);
    }

    const fileContent = await this.readFileContent(this._selectedFiles[0]);
    this.bpost.naslovnica = fileContent;
  }



  readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        if (reader.result != null) {
          const text = reader.result.toString();
          //this.compressFile(file,file.name+"c");
          resolve(text);
        }
      };
      //console.log(this.imgResultAfterCompress);
      reader.readAsDataURL(file);

      /* const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result != null) {
          compress(reader.result.toString(), {
            width: 400,
            type: 'image/png', // default
            max: 200, // max size
            min: 20, // min size
            quality: 0.8
          }).then(result => {
            console.log(result);
          });
        }
      };
      reader.readAsDataURL(file);*/

    });
  }

  imgResultBeforeCompress!: string;
  imgResultAfterCompress!: string;
  compressFile(image: any, fileName: any) {
    var orientation = -1;
    // this.imageCompress.compressFile(image, orientation, 50, 50).then(
    //   result => {
    //     this.imgResultAfterCompress = result;
    //     // create file from byte
    //     const imageName = fileName;
    //     // call method that creates a blob from dataUri
    //     const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
    //     //imageFile created below is the new compressed file which can be send to API in form data
    //     const imageFile = new File([result], imageName, { type: 'image/jpeg' });
    //   });
  }
  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  _onReset() {
    this._selectedFiles = [];
  }

  _reset() {
    this._buttonPicker.reset();
    this._dropZonePicker.reset();
  }



  /*
    file: any;
    localUrl: any;
    localCompressedURl: any;
    selectFile(event: any) {
      var fileName: any;
      this.file = event.target.files[0];
      fileName = this.file['name'];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader()
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
          this.compressFile(this.localUrl, fileName)
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    imgResultBeforeCompress!: string;
    imgResultAfterCompress!: string;
    compressFile(image: any, fileName: any) {
      var orientation = -1;
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          //imageFile created below is the new compressed file which can be send to API in form data
          const imageFile = new File([result], imageName, { type: 'image/jpeg' });
        });
    }
    dataURItoBlob(dataURI: any) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      return blob;
    }*/
}

