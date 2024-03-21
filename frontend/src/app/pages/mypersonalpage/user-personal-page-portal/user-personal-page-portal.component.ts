import { Component, OnInit } from '@angular/core';
import { LandingComponent } from '../../landing/landing.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card'
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { EditUserAdminComponent } from '../../admin-page-setting/user-page-tab-admin/edit-user-admin/edit-user-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentLogBookComponent } from '../student-log-book/student-log-book.component';
import { MatButton } from '@angular/material/button'

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
    MatCardModule
  ],providers: [
    StudentLogBookComponent
  ],
  template: `
    <div class="user-personal-page">
      <div class="user-info">
        <img class="user-photo" src="фото" alt="user photo">
        <p>Андрей</p>
        <p>Невский</p>
      </div>

      <div class="user-cards">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Успеваемость</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Средний балл: </p>
            <p>Количество пройденных курсов: </p>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Контактная информация</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Email: </p>
            <p>Телефон: </p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="user-actions">
        <button mat-button>
          Редактировать профиль
        </button>
      </div>
    </div>
    <div>
      <button mat-button (click)="openStudentLogBook()">
        Журнал успеваемости
      </button>
    </div>
    

  `,
  styles: [`
      .user-personal-page {
          display: flex;
          flex-direction: row;
      }

      .user-info {
          margin-right: 20px;
          width: 200px;
          text-align: center;
      }

      .user-cards {
          flex: 1;
      }

      .user-actions {
          margin-top: 20px;
      }
      .user-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin-bottom: 20px;
      }
  `],
})
/*
*Проработать профиль студента
*добавить необходимые данные
*
*/
export class UserPersonalPagePortalComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}
  ngOnInit() {}

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
