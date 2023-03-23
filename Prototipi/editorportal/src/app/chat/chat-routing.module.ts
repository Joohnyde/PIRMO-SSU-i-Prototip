import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from 'node_modules/@angular/router';
import { MessageComponent } from './message/message.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: "",
    component: MessageComponent,
  },
  {
    path: "posts",
    component: MessageComponent,
  },
  {
    path:'categories',
    component: CategoriesComponent
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class ChatRoutingModule { }
