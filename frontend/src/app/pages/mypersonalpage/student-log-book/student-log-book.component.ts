import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material/table'
import { Component, OnInit } from '@angular/core';
import { UserPersonalPagePortalComponent } from '../user-personal-page-portal/user-personal-page-portal.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../admin-page-setting/adminService/UserService';
import { NgForOf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MatDatepickerToggle,
  MatDatepicker,
  MatDatepickerInput,
} from '@angular/material/datepicker';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Иностранный язык', weight: 90, symbol: '5' },
  { position: 2, name: 'Информатика', weight: 87, symbol: '5' },
  { position: 3, name: 'История России', weight: 77, symbol: '4' },
  { position: 4, name: 'Математический анализ', weight: 91, symbol: '4' },
  { position: 5, name: 'Основы проектной деятельности', weight: 70, symbol: '4' },
  { position: 6, name: 'Программирование', weight: 55, symbol: '3' },
  { position: 7, name: 'Физика', weight: 67, symbol: '3' },
  { position: 8, name: 'Физическая культура и спорт', weight: 75, symbol: '4' },
];

@Component({
  selector: 'app-student-log-book',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
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
    HttpClientModule,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow
  ],
  template: `
    <p>student-log-book works!</p>
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef>No.</th>
        <td mat-cell *matCellDef="let element">{{ element.position }}</td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Предмет</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="weight">
        <th mat-header-cell *matHeaderCellDef>Кол-во баллов</th>
        <td mat-cell *matCellDef="let element">{{ element.weight }}</td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="symbol">
        <th mat-header-cell *matHeaderCellDef>Оценка</th>
        <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class StudentLogBookComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}
