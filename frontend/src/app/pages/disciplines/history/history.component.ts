import {ReportHistoryComponent} from "./dir/report-history/reporthistory.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";
import {Component} from "@angular/core";

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatListModule,
        MatProgressBarModule,
        MatDividerModule,
        MatDialogModule,
    ],
    template: `
        <div class="container">
            <div class="header">
                <mat-chip-listbox>
                    <mat-chip>Буханцева А.В.</mat-chip>
                    <mat-chip>Ясудис А.В.</mat-chip>
                    <button mat-flat-button (click)="openDialog()">Отчет</button>
                </mat-chip-listbox>
                <mat-progress-bar mode="determinate" value="5"></mat-progress-bar>
            </div>
            <div class="main">
                <p>
                    Электронный учебно-методический курс "История" предназначен для
                    студентов I курса НГТУ. Задача курса оказать помощь в изучении
                    дисциплины "История", подготовке к семинарским занятиям и итоговой
                    аттестации.
                </p>
                <div>
                    <p>Краткое описание учебно-методического курса "История".</p>
                    <ul>
                        <li>Результат освоение (цели) дисциплины</li>
                        <li>Тематическое содержание дисциплины</li>
                        <li>Рекомендации по работе с ЭУМК</li>
                        <li>Теоретические материалы</li>
                        <li>Контрольно-измерительные материалы</li>
                        <li>Методические указания по выполнению всех видов работ</li>
                        <li>Список литературы/интернет ресурсы</li>
                        <li>Словарь терминов</li>
                        <li>Аудиолекция</li>
                        <li>Тесты контроля успеваемости</li>
                    </ul>
                </div>
                <mat-divider></mat-divider>
            </div>
            <div class="footer">
                <div>
                    <p>Факультеты и специальности</p>
                    <mat-chip-listbox>
                        <mat-chip>ФГО</mat-chip>
                        <mat-chip>ЗО</mat-chip>
                        <mat-chip>ИСТР</mat-chip>
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
    `],
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
