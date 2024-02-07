import { Component, Inject, OnInit } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { HttpClientModule } from '@angular/common/http'
import { UserInfo } from '../../models'
import { UserService } from '../../adminService/UserService'

/**
 * InfoUser
 * Карточка пользователя
 *
 * */
@Component({
  selector: 'app-info-user-admin-page',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent,
    MatTableModule,
    HttpClientModule,
    MatDialogModule
  ], providers: [
    UserService
  ],
  template: `
    <div class="window">

      <div class="left">
        <mat-card>
          <mat-card-content>
            Photo
          </mat-card-content>
        </mat-card>
      </div>

      <div class="right">
        <mat-card>
          <mat-card-content id="id">
            ID:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="login">
            Login:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="full_name">
            ФИО:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="user_age">
            Возраст:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="gender">
            Пол:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="email">
            Email:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="b_days">
            Дата рождения:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content id="role">
            Роль:
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content group="group">
            Группа:
          </mat-card-content>
        </mat-card>
      </div>

    </div>
  `,
  styles: [`
    mat-card {
      margin-bottom: 10px;
    }

    .window {
      display: flex;
      width: 1000px;
      height: 700px;
      border: 1px solid #000;
      padding: 20px;
      box-sizing: border-box;
      //opacity: 0.85; /* Прозрачность 15% */
    }

    .left, .right {
      flex: 1;
      padding: 10px;
    }

  `]
})

export class InfoUserAdminPageComponent implements OnInit {

  displayedInfoUser: string[] = [
    'id',
    'login',
    'first_name',
    'last_name',
    'middle_name',
    'user_age',
    'email',
    'gender',
    'b_days',
    'role',
    'group'
  ]

  dataSource!: MatTableDataSource<any>

  constructor(
    private dialogRef: MatDialogRef<InfoUserAdminPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.addInfoUserForm(this.data.id);
  }

  addInfoUserForm(id: string): void {
    this._userService.getUserInfo(id).subscribe(
      (data: UserInfo) => {
        this.dataSource = new MatTableDataSource<UserInfo>([data])
        // Заполняем данные в шаблоне
        this.fillDataInTemplate(data)
      },
      (error) => {
        // Обработка ошибок при загрузке данных
        console.error('Error loading user info:', error)
      }
    )
  }

  fillDataInTemplate(data: UserInfo): void {
    // Заполняем данные в соответствующих элементах шаблона
    const idElement = document.getElementById('id')
    if (idElement) {
      idElement.innerText = 'ID: ' + data.id
    }

    const loginElement = document.getElementById('login')
    if (loginElement) {
      loginElement.innerText = 'Login: ' + data.login
    }

    const fullNameElement = document.getElementById('full_name')
    if (fullNameElement) {
      fullNameElement.innerText = 'ФИО: ' + data.last_name + ' ' + data.first_name + ' ' + data.middle_name
    }

    const userAgeElement = document.getElementById('user_age')
    if (userAgeElement) {
      userAgeElement.innerText = 'Возраст: ' + data.user_age
    }

    const genderElement = document.getElementById('gender')
    if (genderElement) {
      genderElement.innerText = 'Пол: ' + data.gender
    }

    const emailElement = document.getElementById('email')
    if (emailElement) {
      emailElement.innerText = 'Email: ' + data.email
    }

    const bDaysElement = document.getElementById('b_days')
    if (bDaysElement) {
      bDaysElement.innerText = 'Дата рождения: ' + data.b_days
    }

    const roleElement = document.getElementById('role')
    if (roleElement) {
      roleElement.innerText = 'Роль: ' + data.role
    }

    const groupElement = document.getElementById('group')
    if (groupElement) {
      groupElement.innerText = 'Группа: ' + data.group
    }
  }
}
