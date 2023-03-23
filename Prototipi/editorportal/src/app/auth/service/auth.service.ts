import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { from, Observable } from 'rxjs';
import { Router, NavigationEnd, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloakService: KeycloakService, private router: Router) { }

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined = this.keycloakService.getKeycloakInstance()
        .idTokenParsed;
      return userDetails;
    } catch (e) {
      console.error("Exception", e);
      return undefined;
    }
  }

  public isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keycloakService.loadUserProfile();
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }

  public redirectToProfile(): void {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  public getToken(): String {
    let token: string=" ";
    this.keycloakService.getToken().then((data) => {
       console.log("Promise resolved with: " + JSON.stringify(data));
       console.log(token);
      token = data;
 
    }, (error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    })
    return token;

  }
}
