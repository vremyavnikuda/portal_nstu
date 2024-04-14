import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {DisciplinesComponent} from "../disciplines.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ReportHistoryComponent} from "./dir/report-history/reporthistory.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatListModule,
        MatProgressBarModule,
    ],
    template: `
        <div>
            <div>
                <mat-chip-listbox>
                    <mat-chip>
                        Буханцева А.В.
                    </mat-chip>
                    <mat-chip>
                        Ясудис А.В.
                    </mat-chip>
                    <button mat-flat-button class="element-3" (click)="openDialog()" >Отчет</button>
                </mat-chip-listbox>
            </div>
            <mat-progress-bar mode="determinate" value="5"></mat-progress-bar>
        </div>

        <p>
            history.component -> содержится материал по Истории России
        </p>

        <p>
            Электронный учебно-методический курс "История" предназначен для студентов I курса НГТУ. Задача курса оказать
            помощь в изучении дисциплины "История", подготовке к семинарским занятиям и итоговой аттестации.
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

        <div class="container">
            <p>Факультеты и специальности</p>
            <mat-chip-listbox>
                <mat-chip>
                    ФГО
                </mat-chip>
                <mat-chip>
                    ЗО
                </mat-chip>
                <mat-chip>
                    ИСТР
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
export class HistoryComponent {
    constructor(public dialog: MatDialog) {

    }
    openDialog() {
        const dialogRef = this.dialog.open(ReportHistoryComponent,{
            height: '400px',
            width:'600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
