import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker'
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio'
import { MatOption } from '@angular/material/select'
import { NgForOf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { UserService } from '../../adminService/UserService'
import { HttpClient, HttpClientModule } from '@angular/common/http'


/*
Вчера я остановился тут
так и не решил вопрос с обновлением данных пользователя
-> вопросы которые нужно решить
* группы = как мы их будем хранить и из чего они вообще будут браться (DB , формат json, или просто струкрута backend)
вот примеры

В виде дополнительного атрибута в каждом объекте студента:
Кроме простого списка групп, вы можете добавить дополнительные атрибуты к каждому объекту группы внутри студента, например, статус членства в группе.

Пример:
{
  "student_id": 1,
  "name": "Иван",
  "groups": [
    {"group_id": 101, "group_name": "Группа1", "status": "Активен"},
    {"group_id": 102, "group_name": "Группа2", "status": "Приостановлен"}
  ]
}

или в таком формате ->

В виде списка в каждом объекте студента:
В каждом объекте студента добавьте поле, которое содержит список групп, к которым этот студент относится. Это может быть просто массив строк, представляющих идентификаторы групп.
Пример:
+------------+-------+
| student_id | name  |
+------------+-------+
| 1          | Иван  |
| 2          | Мария |
+------------+-------+
->
+---------+--------+
| group_id|  name  |
+---------+--------+
| 101     | Группа1|
| 102     | Группа2|
+---------+--------+
->
+-------------------+------------+
| student_group_id | student_id |
+-------------------+------------+
| 1                 | 1          |
| 2                 | 1          |
| 3                 | 2          |
+-------------------+------------+

Ну и в итоге дописать фичу редактирование данных пользователя
 */

@Component({
  selector: 'app-edit-user-admin',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatDialogContent,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatRadioGroup,
    MatLabel,
    MatRadioButton,
    MatOption,
    NgForOf,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDatepickerInput,
    MatSelectModule,
    MatInputModule,
    HttpClientModule

  ], providers: [
    UserService,
    HttpClient
  ],
  template: `
    <p>
      edit-user-admin works!
    </p>
    <h1 mat-dialog-title>Edit User</h1>
    <div mat-dialog-content>
      <form [formGroup]="editUserForm">
        <mat-form-field class="full-width">
          <mat-label>ID</mat-label>
          <input matInput formControlName="user_id" placeholder="user_id" readonly>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Имя</mat-label>
          <input matInput formControlName="first_name" placeholder="Имя" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Фамилия</mat-label>
          <input matInput formControlName="last_name" placeholder="Фамилия" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Отчество</mat-label>
          <input matInput formControlName="middle_name" placeholder="Отчество" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" placeholder="Email" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Роль</mat-label>
          <mat-select formControlName="role" placeholder="Роль" required>
            <mat-option *ngFor="let role of roles" [value]="role">
              {{ role }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Факультет</mat-label>
          <mat-select formControlName="role" placeholder="Факультет" required>
            <mat-option *ngFor="let role of roles" [value]="role">
              {{ role }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Группа</mat-label>
          <mat-select formControlName="role" placeholder="Группа" required>
            <mat-option *ngFor="let role of roles" [value]="role">
              {{ role }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Отмена</button>
      <button mat-button color="primary" type="button"
              [disabled]="!editUserForm.valid" (click)="updUserInfoData()">Обновить
      </button>
    </div>

  `,
  styles: [`
    .content {
      padding-top: 10px;
    }

    .row {
      display: flex;
      gap: 10px;

      mat-form-field {
        width: 100%;
      }
    }

    .action {
      padding: 0 25px 20px;

      button {
        flex: 1;
      }
    }
  `]
})


export class EditUserAdminComponent {
  displayedInfoUser: string[] = [
    'user_id',
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

  editUserForm: FormGroup

  roles: string[] = [
    'Admin',
    'Пользователь',
    'Студент',
    'Модератор',
    'Рекрутер',
    'Работодатель',
    'Преподаватель'
  ]

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private http: HttpClient
  ) {
    // Создаем копию данных, чтобы избежать асинхронных изменений
    const dataCopy = { ...data }
    this.editUserForm = this.fb.group({
      user_id: [dataCopy.user_id, Validators.required],
      first_name: [dataCopy.first_name, Validators.required],
      last_name: [dataCopy.last_name, Validators.required],
      middle_name: [dataCopy.middle_name, Validators.required],
      email: [dataCopy.email, [Validators.required, Validators.email]],
      role: [dataCopy.role, Validators.required]
    })
    console.log('Received data:', this.data)
  }

  updUserInfoData() {
    if (this.editUserForm.valid) {
      const userId = this.data.user_id

      // Check if userId is defined and is a number
      if (userId === undefined || typeof userId !== 'number' || isNaN(userId)) {
        console.error('Invalid user_id:', userId)
        // Handle the case when user_id is not defined or not a valid number
        return
      }

      const apiUrl = `http://localhost:8000/api/user-auth-controller/updateUser/${userId}`

      this.http.put(apiUrl, this.editUserForm.value)
        .subscribe(
          (response) => {
            console.log('User updated successfully', response)
            this.dialogRef.close(this.editUserForm.value)
          },
          (error) => {
            console.error('Error updating user', error)
            // Display an error message to the user or handle it appropriately
          }
        )
    } else {
      console.log('Form is not valid')
      // Handle the case when the form is not valid
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
