import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { MessageComponent } from './message/message.component';

import {FormsModule, ReactiveFormsModule} from 'node_modules/@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { FormComponent } from './form/form.component';
import { FilePickerDirective } from './form/file-picker.directive';
// import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxEditorModule } from 'ngx-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    MessageComponent,
    CategoriesComponent,
    FormComponent,
    FilePickerDirective
  ],
  providers:[

    
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],

  imports: [
    
    MatDialogModule,
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,    NgxEditorModule,
    NgScrollbarModule
    
  ]
})
export class ChatModule { }
