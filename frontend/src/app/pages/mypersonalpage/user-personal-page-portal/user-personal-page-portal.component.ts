import { Component, OnInit } from '@angular/core';
import { LandingComponent } from '../../landing/landing.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { EditUserAdminComponent } from '../../admin-page-setting/user-page-tab-admin/edit-user-admin/edit-user-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentLogBookComponent } from '../student-log-book/student-log-book.component';

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
    StudentLogBookComponent
  ],providers: [
    StudentLogBookComponent
  ],
  template: `
    <p>DEV</p>
    <div>
      <button mat-raised-button color="primary" (click)="openStudentLogBook()">
        Журнал успеваемости
      </button>
    </div>
  `,
  styles: [`


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
