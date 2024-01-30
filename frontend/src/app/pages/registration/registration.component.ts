import {RegistrationPagesComponent} from "./registration-pages/registration-pages.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginPageComponent} from "../login/login-pages/login-page.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LandingComponent} from "../landing/landing.component";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Component} from "@angular/core";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
    imports: [
        FormsModule,
        NgClass,
        LandingComponent,
        RouterLink,
        NgIf,
        RouterOutlet,
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        LoginPageComponent,
        RegistrationPagesComponent,
        MatNativeDateModule,
    ],
    selector: 'app-registration',
    standalone: true,
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
    template: `
        <div class="content">
            <router-outlet></router-outlet>
        </div>

        <app-registration-pages class="center"></app-registration-pages>
    `
})

export class RegistrationComponent {

    constructor(public authService: AuthenticationService, private router: Router) {
    }
}
