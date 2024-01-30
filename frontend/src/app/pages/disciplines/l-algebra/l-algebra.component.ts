import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReportHistoryComponent} from "../history/dir/report-history/reporthistory.component";
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
    <div>
      <div>
        <mat-chip-listbox>
          <mat-chip>
            Пономарев К.Н.
          </mat-chip>
          <button mat-flat-button class="element-3" (click)="openDialog()" >Отчет</button>
        </mat-chip-listbox>
      </div>
      <mat-progress-bar mode="determinate" value="5"></mat-progress-bar>
    </div>
    <p>
      l-algebra.component -> содержится материал по Линейной Алгебре
    </p>
    <p>Представлены два первых раздела высшей математики: линейная алгебра и аналитическая геометрия, а также теория пределов функций одной вещественной переменной.</p>
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
    <div class="container">
      <p>Факультеты и специальности</p>
      <mat-chip-listbox>
        <mat-chip>
          ЗО
        </mat-chip>

        <button mat-stroked-button color="primary" class="element-3">Начать</button>
        <button mat-stroked-button color="primary" class="element-3">Продолжить</button>
      </mat-chip-listbox>
    </div>
  `,
  styles: [`
      
      .element-3{
        position: relative;
        left: 80%;
      }
      
      spacer {
        margin-bottom: 20px;
      }

      .example-button-row {
        display: table-cell;
        max-width: 600px;
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
