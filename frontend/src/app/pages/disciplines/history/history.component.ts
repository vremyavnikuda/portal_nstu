import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ReportHistoryComponent } from './dir/report-history/reporthistory.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  template: `
    <div id="cssportal-grid">
      <div id="header">
        <div>
          <div>
            <mat-chip-listbox>
              <mat-chip>Буханцева А.В.</mat-chip>
              <mat-chip>Ясудис А.В.</mat-chip>
              <button mat-flat-button class="element-3" (click)="openDialog()">
                Отчет
              </button>
            </mat-chip-listbox>
          </div>
          <mat-progress-bar mode="determinate" value="5"></mat-progress-bar>
        </div>
      </div>
      <div id="main">
        <p>
          Электронный учебно-методический курс "История" предназначен для
          студентов I курса НГТУ. Задача курса оказать помощь в изучении
          дисциплины "История", подготовке к семинарским занятиям и итоговой
          аттестации.
        </p>
        <div>
          <p>Краткое описание учебно-методического курса "История".</p>
          <p>- Результат освоение (цели) дисциплины</p>
          <p>- Тематическое содержание дисциплины</p>
          <p>- Рекомендации по работе с ЭУМК</p>
          <p>- Теоретические материалы</p>
          <p>- Контрольно-измерительные материалы</p>
          <p>- Методические указания по выполнению всех видов работ</p>
          <p>- Список литературы/интернет ресурсы</p>
          <p>- Словарь терминов</p>
          <p>- Аудиолекция</p>
          <p>- Тесты контроля успеваемости</p>
        </div>
        <mat-divider></mat-divider>
      </div>
      <div id="footer">
        <div class="container">
          <p>Факультеты и специальности</p>
          <mat-chip-listbox>
            <div style="display: flex; align-items: center;">
              <mat-chip>ФГО</mat-chip>
              <mat-chip>ЗО</mat-chip>
              <mat-chip>ИСТР</mat-chip>
            </div>
            <div class="button-container">
              <button mat-stroked-button color="primary">Начать</button>
              <button mat-stroked-button color="primary">Продолжить</button>
            </div>
          </mat-chip-listbox>
        </div>
      </div>
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
        #button-container {
          display: flex;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class HistoryComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ReportHistoryComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
