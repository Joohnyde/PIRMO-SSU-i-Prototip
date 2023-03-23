import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  public constructor(
    public dialogRef: MatDialogRef<DialogComponent>){}
  
  public link !: String;

  public otkazi() {

    this.dialogRef.close();
  }

  public setLink(){
    this.link = "https://www.nomtek.com/blog/flutter-vs-react-native";
  }

  public salji() {
    this.dialogRef.close(this.link);

  }
  public obradaUToku():boolean {
    if(!this.link) return true;
    return this.link.length==0;
  }

  onKey(event: any) { const inputValue = event.target.value; this.link = inputValue; }
}