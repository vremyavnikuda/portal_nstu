import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {LandingComponent} from "../../landing/landing.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterOutlet,
        LandingComponent,
        ReactiveFormsModule,
        MatInputModule,
        RouterLink,
        NgIf,
        HttpClientModule,
    ],
    template: `
        <div class="form-container mat-elevation-z5 centerFormLogin">
            <h1>Login</h1>
            <form [formGroup]="loginForm" (submit)="submit()">
                <mat-form-field>
                    <mat-label class="type-font-form">Email</mat-label>
                    <input matInput formControlName="email" type="email" class="form-control"
                           placeholder="mail@example.com" required autocomplete="off">
                </mat-form-field>

                <mat-form-field>
                    <mat-label class="type-font-form">Password</mat-label>
                    <input matInput placeholder="Password" formControlName="password" required autocomplete="off">
                </mat-form-field>

                <span class="center margin-top">Первый раз на портале? <a class="sing-up-link" routerLink="registration" (click)="goToRegistrationPage()">Зарегистрироваться!</a></span>

                <div class="center margin-top">
                    <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">Login</button>
                </div>

            </form>
        </div>

    `,
    styles: [`

      .errorMesConfPass {
        color: red;
      }

      .type-font-form {
        font-size: 16px;
      }

      .my-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .full-width {
        width: 100%;
      }

      .centerFormLogin {
        margin-top: 80px;
      }

    `]
})
export class LoginPageComponent implements OnInit {

    //Время когда пользователь вошёл в систему  User_temporary_data => LastLogin string `json:"last_login"`
    currentTimeUserOnline = new Date().toISOString().split('T')[0];

    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: '',
        })
    }

    submit(): void {
        this.http.post('http://localhost:8000/api/login', this.loginForm.getRawValue(), {
            withCredentials: true,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).subscribe(() => this.router.navigate(['/main']));
        console.log("submit()== true -> пользователь перенаправлен на endpoint /main")
        console.log(this.currentTimeUserOnline)

    }

    //TODO: обработчик события нажатия на кнопку (@регистрация) -> /registration
    // @goToregistrationPage()
    goToRegistrationPage() {
        this.router.navigate(["/registration"]).then(r => true)
        console.log("goToRegistrationPage() -> пользователь перенаправлен на endpoint /registration")
    }
}
