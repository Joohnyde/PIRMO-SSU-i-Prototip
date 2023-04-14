import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',

  },
  {
    path: 'portal',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGuard],
    data: { allowedRoles: ["user", "admin"] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[

    
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
})
export class AppRoutingModule { }
