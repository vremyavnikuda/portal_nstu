import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReportLAlgebraComponent} from "./dir/report-l-algebra/report-l-algebra.component";

@Component({
  selector: 'app-l-algebra',
  standalone: true,
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  template: `
      <div class="container">
          <div class="header">
              <mat-chip-listbox>
                  <mat-chip>Пономарев К.Н.</mat-chip>
                  <button mat-flat-button (click)="openDialog()">Отчет</button>
              </mat-chip-listbox>
              <mat-progress-bar mode="determinate" value="5"></mat-progress-bar>
          </div>

          <div class="main">
              <p>Представлены два первых раздела высшей математики: линейная алгебра и аналитическая геометрия, а также
                  теория
                  пределов функций одной вещественной переменной.</p>
              <div>
                  <p>Краткое описание учебно-методического курса "История".</p>
                  <p>- Теоретические материалы</p>
                  <p>- Расчетно-графические работы</p>
                  <p>- Занятие 6 октября 2023</p>
                  <p>- Занятие 20 октября 2023</p>
                  <p>- Занятие 3 ноября 2023</p>
                  <p>- Занятие 17 ноября 2023</p>
                  <p>- Занятие 1 декабря 2023</p>
              </div>
              <mat-divider></mat-divider>
          </div>

          <div class="footer">
              <div>
                  <p>Факультеты и специальности</p>
                  <mat-chip-listbox>
                      <mat-chip>ЗО</mat-chip>
                  </mat-chip-listbox>
              </div>
              <div class="button-container">
                  <button mat-stroked-button color="primary">Начать</button>
                  <button mat-stroked-button color="primary">Продолжить</button>
              </div>
          </div>
      </div>
  `,
  styles: [`

    .container {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 1fr;
      gap: 10px;
      height: 100%;
    }

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .main {
      padding: 10px;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }

    mat-chip-list {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .button-container {
      display: flex;
      gap: 10px;
    }
  `]
})
export class LAlgebraComponent {
  constructor(public dialog: MatDialog) {

  }
  openDialog() {
    const dialogRef = this.dialog.open(ReportLAlgebraComponent,{
      height: '400px',
      width:'600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
