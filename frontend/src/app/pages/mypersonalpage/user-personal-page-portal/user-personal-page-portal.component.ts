import { Component, OnInit } from '@angular/core';
import { LandingComponent } from '../../landing/landing.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { EditUserAdminComponent } from '../../admin-page-setting/user-page-tab-admin/edit-user-admin/edit-user-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentLogBookComponent } from '../student-log-book/student-log-book.component';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../../../emitters/emitters';

@Component({
  selector: 'app-user-personal-page-portal',
  standalone: true,
  imports: [
    LandingComponent,
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    EditUserAdminComponent,
    StudentLogBookComponent,
    MatButton,
    MatCardHeader,
    MatCardActions,
    MatCardImage,
    MatCardModule,
  ],
  providers: [StudentLogBookComponent],
  template: `
    <div id="header" style="padding: 16px">
      <button mat-button (click)="openStudentLogBook()">
        Журнал успеваемости
      </button>
      <button mat-button>Редактировать профиль</button>
    </div>
    <div id="main" style="padding: 16px">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Информация</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>{{ currentUserRole }}</p>
          <p>ФИО: {{ currentUser }}</p>
          <p>Факультет:</p>
          <p>Группа:</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Успеваемость</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Средний балл:</p>
          <p>Количество пройденных курсов:</p>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Контактная информация</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Email: {{ emailUser }}</p>
          <p>Телефон:</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      #cssportal-grid {
        display: grid;
        grid-template-rows: 80px 1fr 80px;
        grid-template-columns: 20% 1fr 20%;
        gap: 10px;
        width: 100%;
        height: 100%;
      }
      #header {
        grid-area: 1 / 1 / 2 / 4;
      }
      #main {
        grid-area: 2 / 1 / 3 / 4;
      }
      #footer {
        grid-area: 3 / 1 / 4 / 4;
      }
    `,
  ],
})
/*
TODO: @UserPersonalPagePortalComponent  -> компонент для работы с личной информацией о пользователе
*
*/
export class UserPersonalPagePortalComponent implements OnInit {
  currentUser: any;
  currentUserRole: any;
  emailUser: any;
  constructor(
    private _dialog: MatDialog,
    private _authService: AuthenticationService,
    private _http: HttpClient
  ) {}
  ngOnInit() {
    this._http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.currentUser = `${res.last_name} ${res.first_name} ${res.middle_name}`;
          this.currentUserRole = `${res.role}`;
          this.emailUser = `${res.email}`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.currentUser = 'You are not logged in';
          Emitters.authEmitter.emit(false);
        }
      );
  }

  // TODO: Открытие модального окна журнала успеваемости студента
  openStudentLogBook() {
    const dialogRef = this._dialog.open(StudentLogBookComponent, {
      /*
      Тут реализуется логика получения данных из журнала успеваемости конкретного студента
      под которым авторизовался пользователь
      */
      width: '1000px',
      height: '600px',
    });
  }
}
