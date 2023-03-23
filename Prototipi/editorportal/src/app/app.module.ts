import { NgModule,APP_INITIALIZER } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { initializer } from './auth/keycloak-initializer';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';
import { HeaderComponent } from './header/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/sr';
import { MenuComponent } from './header/menu/menu.component';
import { CategoriesService } from './services/categories.service';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
registerLocaleData(localeFr, 'sr');

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        DialogComponent
    ],
    providers: [
        
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
        { provide: LOCALE_ID, useValue: 'sr' },
        // { provide: MAT_DATE_LOCALE, useValue: 'sr-Latn' },
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService],
        },
        AuthGuard,
        AuthService,
        CategoriesService
    ],
    bootstrap: [AppComponent],
    imports: [
        
    MatDialogModule,
        BrowserModule,
        AppRoutingModule,
        KeycloakAngularModule,
        AuthModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        FormsModule,
        DatePickerModule,
        HttpClientModule
    ]
})
export class AppModule { }
