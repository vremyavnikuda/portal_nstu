import { Component, OnInit, ViewChild } from '@angular/core'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table'
import { HttpClient } from '@angular/common/http'
import { NgIf } from '@angular/common'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { CoreService } from './coreServiceBar/CoreService'
import { MatDialog } from '@angular/material/dialog'
import { EditUserAdminComponent } from './edit-user-admin/edit-user-admin.component'
import { ConfDeleteUserComponent } from '../conf-delete-user/conf-delete-user.component'
import { InfoUserAdminPageComponent } from './info-user-admin-page/info-user-admin-page.component'

@Component({
  selector: 'app-user-page-tab-admin',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    NgIf,
    MatTable,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatFormField,
    MatInput,
    MatLabel,
    MatIconButton,
    MatIcon
  ],
  template: `
    <p>
      user-page-tab-admin works!
    </p>
    <div class="main-body">

      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="search" #input>
      </mat-form-field>

      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef>
            ID
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.id }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="login">
          <mat-header-cell *matHeaderCellDef>
            Login
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.login }}
          </mat-cell>
        </ng-container>


        <ng-container matColumnDef="full_name">
          <mat-header-cell *matHeaderCellDef>
            ФИО
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.last_name }} {{ user.first_name }} {{ user.middle_name }}
          </mat-cell>
        </ng-container>


        <ng-container matColumnDef="user_age">
          <mat-header-cell *matHeaderCellDef>
            Возраст
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.user_age }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef>
            Email
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.email }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="gender">
          <mat-header-cell *matHeaderCellDef>
            Пол
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.gender }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="b_days">
          <mat-header-cell *matHeaderCellDef>
            Дата рождения
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.b_days }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="role">
          <mat-header-cell *matHeaderCellDef>
            Роль
          </mat-header-cell>
          <mat-cell *matCellDef="let user">
            {{ user.role }}
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="action">
          <mat-header-cell mat-header-cell *matHeaderCellDef> Action</mat-header-cell>
          <mat-cell mat-cell *matCellDef="let row">
            <button mat-icon-button color="primary" (click)="openEditForm(row)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteEmployee(row.id)">
              <mat-icon>delete</mat-icon>
            </button>
            <button mat-icon-button color="black" (click)="openInfoForm(row)">
              <mat-icon>info</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

    </div>

  `,
  styles: [`
    .main-body {
      padding-top: 20px;
      margin: 0 auto;
      max-width: 1348px;

      mat-form-field {
        width: 100%;
      }
    }
  `]
})
export class UserPageTabAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  displayedColumns: string[] = [
    'id',
    'login',
    'full_name',
    'action'
  ]

  constructor(
    private http: HttpClient,
    private _coreService: CoreService,
    private _dialog: MatDialog
  ) {
  }

  dataSource!: MatTableDataSource<any>

  ngOnInit() {
    this.loadData()
  }

  loadData(): void {
    this.http.get<any[]>('http://localhost:8000/api/allUser').subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }


  //Удаление пользователя с подтверждением ,если пользователь был удален ,то произойдет обновление таблицы
  deleteEmployee(id: any) {
    const dialogRef = this._dialog.open(ConfDeleteUserComponent, {
      data: {
        message: 'Вы уверены, что хотите удалить пользователя?',
        buttonText: {
          ok: 'Да',
          cancel: 'Отмена'
        }
      }
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.delete<any>('http://localhost:8000/api/deleteUser/' + id).subscribe(
          {
            next: (res) => {
              this._coreService.openSnackBar('Employee deleted!', 'done')
              // Перезагрузка данных после успешного удаления
              this.loadData()
            },
            error: (err) => {
              console.error('Error deleting employee', err)
              // Обработка ошибок, если необходимо
            }
          }
        )
      }
    })
  }

  //Обновление данных пользователя и последующее обновление талицы
  openEditForm(data: any) {
    console.log('Data before opening EditUserAdminComponent:', data)
    this._coreService.openSnackBar('Данные обновлены!', 'ok')

    const dialogRef = this._dialog.open(EditUserAdminComponent, {
      data: {
        user_id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        email: data.email,
        role: data.role
      },
      width: '700px',
      height: '400px'
    });
  }


  //Информационное окно пользователя
  openInfoForm(data: any) {
    const dialogRef = this._dialog.open(InfoUserAdminPageComponent, {
      data
    })
  }
}
