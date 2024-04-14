import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule,
} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

//TODO: Форма регистрации пользователя
// При регистрации пользователь получает роль "USER"
@Component({
  selector: 'app-registration-pages',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  //цвет переключателя "Пол"
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
  template: `
    <div class="form-container mat-elevation-z5" autocomplete="off">
      <h1>Registration</h1>
      <form [formGroup]="form" (ngSubmit)="submitRegistration()">
        <mat-form-field class=" full-width">
          <mat-label class="type-font-form">Логин</mat-label>
          <input
            matInput
            formControlName="login"
            type="login"
            class="form-control"
            placeholder="Логин"
            required
            autocomplete="off"
          />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label class="type-font-form">Имя</mat-label>
          <input
            matInput
            formControlName="first_name"
            type="first_name"
            class="form-control"
            placeholder="Имя"
            required
            autocomplete="off"
          />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label class="type-font-form">Фамилия</mat-label>
          <input
            matInput
            formControlName="last_name"
            type="last_name"
            class="form-control"
            placeholder="Фамилия"
            required
            autocomplete="off"
          />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label class="type-font-form">Отчество</mat-label>
          <input
            matInput
            formControlName="middle_name"
            type="middle_name"
            class="form-control"
            placeholder="Отчество"
            required
            autocomplete="off"
          />
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label class="type-font-form">Электронный адрес</mat-label>
          <input
            matInput
            formControlName="email"
            type="email"
            class="form-control"
            placeholder="mail@example.com"
            required
            autocomplete="off"
          />
        </mat-form-field>

        <div>
          <mat-form-field>
            <mat-label class="type-font-form">Пароль</mat-label>
            <input
              matInput
              formControlName="password"
              [type]="hide ? 'password' : 'text'"
              placeholder="Пароль"
              required
              autocomplete="off"
            />

            <button
              mat-icon-button
              matSuffix
              (click)="hide = !hide"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hide"
            >
              <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <mat-form-field>
            <mat-label class="type-font-form">Подтверждение пароля</mat-label>
            <input
              matInput
              formControlName="conf_password"
              [type]="hideConf ? 'conf_password' : 'text'"
              placeholder="Подтверждение пароля"
              required
              autocomplete="off"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="hideConf = !hideConf"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hideConf"
            >
              <mat-icon>{{
                hideConf ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
            <div
              *ngIf="form?.errors?.['mismatch'] && form?.touched"
              class="errorMesConfPass"
            >
              Пароли не совпадают
            </div>
          </mat-form-field>
        </div>

        <section class="example-section">
          <label class="example-margin">Пол:</label>
          <mat-radio-group formControlName="gender">
            <mat-radio-button class="example-margin" value="Мужской"
              >Мужской</mat-radio-button
            >
            <mat-radio-button class="example-margin" value="Женский"
              >Женский</mat-radio-button
            >
          </mat-radio-group>
        </section>

        <mat-form-field>
          <mat-label class="type-font-form">Дата рождения</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            placeholder="Дата рождения"
            formControlName="b_days"
            type="b_days"
            required
          />
          <mat-datepicker-toggle
            matSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <span class="center margin-top"
          >Вы уже зарегистрированы?
          <a
            class="sing-up-link"
            routerLink="registration"
            (click)="goToLoginPage()"
            >Login!</a
          ></span
        >
        <mat-card-actions class="center margin-top">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!form.valid"
          >
            REGISTRATION
          </button>
        </mat-card-actions>
      </form>
    </div>
  `,

  styles: [
    `
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
    `,
  ],
})

//TODO: Доработать регистрацию
export class RegistrationPagesComponent implements OnInit {
  //Дата регистрации пользователя User_temporary_data => RegistrationData string `json:"registration_data"`
  currentDataRegistrationUser = {
    registration_data: new Date().toISOString().split('T')[0],
  };

  //Флаги видимости полей ввода(пароля, подтверждения пароля)
  hide = true;
  hideConf = true;

  form!: FormGroup;
  formRegistration!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * TODO:
   *   passwordMatchValidator() -> валидация пароля password == confPassword;
   *   goToLoginPage() -> метод перенаправления пользователя на страницу логина;
   *   submitRegistration() -> метод регистрации пользователя;
   * */
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        login: ['', Validators.required], // User login
        first_name: ['', Validators.required], // User first name
        last_name: ['', Validators.required], // User last name
        middle_name: ['', Validators.required], // User middle name
        email: new FormControl('', [Validators.required, Validators.email]), // User email
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]), // User password
        conf_password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]), // User confirm password
        gender: [''], // User gender
        b_days: [''.split('T')[0], Validators.required], // User date of birth
        role: ['USER'], // User role
      },
      {
        Validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(controlPasswordCONF: AbstractControl) {
    return controlPasswordCONF.get('password')?.value ===
      controlPasswordCONF.get('conf_password')?.value
      ? null
      : { mismatch: true };
  }

  goToLoginPage() {
    this.router.navigate(['/login']).then((r) => true);
    console.log('goToLoginPage() is called with: /login');
  }

  //Проработать регистрацию на api /api/register
  submitRegistration(): void {
    if (this.form.valid) {
      const requestBody = {
        ...this.form.value,
        login: this.form.value.login,
        registration_data:
          this.currentDataRegistrationUser.registration_data.toString(),
        b_day: this.form.value.b_days.toISOString().split('T')[0],
      };

      this.http
        .post('http://localhost:8000/api/register', this.form.getRawValue())
        .subscribe(
          (res) => {
            // Log the response from the API
            console.log(res);
          },
          (error) => {
            console.log('Error occurred during registration:', error);
          }
        );

      this.http
        .post(
          'http://localhost:8001/api/user-temporary-data/addUserDataRegistration',
          requestBody
        )
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error('Error occurred during registration:', error);
            if (error.error) {
              console.error('Server error:', error.error.error);
            }
          }
        );
    }
    this.goToLoginPage();
  }
}
