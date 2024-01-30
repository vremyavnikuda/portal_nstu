import {Component, signal} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Router, RouterOutlet} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {LoginPageComponent} from "./login-pages/login-page.component";
import {LandingComponent} from "../landing/landing.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgIf,
    RouterOutlet,
    LoginPageComponent,
    LandingComponent
  ],
  template: `
      <app-login-page class="center"></app-login-page>
      <router-outlet></router-outlet>
  `,
  styles: [`
    mat-toolbar {
      justify-content: space-between;
    }

    content {
      padding: 32px;
    }

    .center {
      margin-top: 80px;
    }
  `],
})
export class LoginComponent {


  constructor(public authService: AuthenticationService, private router: Router){

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([''])
    });
  }
}
