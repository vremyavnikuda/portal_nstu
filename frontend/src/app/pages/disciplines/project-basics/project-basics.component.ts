import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReportHistoryComponent} from "../history/dir/report-history/reporthistory.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-project-basics',
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
                    <mat-chip>
                        Буханцева А.В.
                    </mat-chip>
                    <mat-chip>
                        Ясудис А.В.
                    </mat-chip>
                    <button mat-flat-button class="element-3" (click)="openDialog()">Отчет</button>
                </mat-chip-listbox>
                <mat-progress-bar mode="determinate" value="99"></mat-progress-bar>
            </div>

            <div class="main">
                <div>
                    <p>Курс разработан для студентов первого курса всех направлений обучения в НГТУ. Теоретический
                        материал
                        курса
                        "Основы проектной деятельности" формирует систему знаний и практических навыков теории и
                        практики
                        проектной
                        деятельности. Начиная с общего представления о том, что такое проектная деятельность, курс
                        постепенно
                        дает
                        пошаговое руководство и ответы на такие вопросы, как: разрабатывать и реализовывать проекты
                        различного
                        типа,
                        как уметь работать в команде и системно мыслить?
                    </p>
                    <p>
                        Совершенно неважно, чем вы будете заниматься в своей профессиональной деятельности –
                        исследованиями,
                        проектированием машин и механизмов, разработкой приложений, программированием или модернизацией
                        производства.
                    </p>
                    <p>
                        После завершения курса будет проще не только решать профессиональные задачи, но и не бояться
                        воплощать в
                        жизнь
                        новые идеи, поскольку будут понятны конкретные шаги по их реализации.
                    </p>

                    <p>
                        Курс "Основы проектной деятельности" рассчитан на 2 семестра. Каждую неделю будет доступна новая
                        тема
                        курса:
                        видеолекции, раскрывающие содержание каждой темы, презентации и конспекты, с которыми можно
                        ознакомиться
                        в
                        любое удобное время. Все темы включают практические занятия, в которых предстоит ознакомиться с
                        примерами
                        решения типовых задач, а затем выполнить задания самостоятельно. Каждая тема завершается
                        контрольным
                        тестом,
                        который покажет, насколько был усвоен предложенный материал. Рекомендуется изучать материал
                        последовательно,
                        что существенно облегчит работу.
                    </p>
                </div>
                <mat-divider></mat-divider>
            </div>
            <div>
                <p>Отчет</p>
                <p>Презентация</p>
                <p>Предлагаемые проекты от НГТУ</p>
                <p>Вводный модуль</p>
                <p>1.Общее представление о проектной деятельности</p>
                <p>2.Формирование команды проекта и коммуникации в проекте</p>
                <p>3.Методы генерации идей</p>
                <p>4.Образ продукта проекта и требования к результату</p>
                <p>5.Планирование проекта</p>
                <p>6.Бюджет проекта</p>
                <p>7.Риски проектов и методы их оценки</p>
                <p>8.Презентация идеи проекта</p>
                <p></p>
            </div>
            <mat-divider></mat-divider>
        </div>

        <div class="footer">
            <div>
                <p>Факультеты и специальности</p>
                <mat-chip-listbox>
                    <mat-chip>ФМА</mat-chip>
                    <mat-chip>ФБ</mat-chip>
                    <mat-chip>РЭФ</mat-chip>
                    <mat-chip>ФЛА</mat-chip>
                    <mat-chip>ФПМИ</mat-chip>
                    <mat-chip>ФТФ</mat-chip>
                    <mat-chip>ФЭН</mat-chip>
                    <mat-chip>ФГО</mat-chip>
                    <mat-chip>ЗО</mat-chip>
                </mat-chip-listbox>
            </div>
            <div class="button-container">
                <button mat-stroked-button color="primary" class="element-3">Начать</button>
                <button mat-stroked-button color="primary" class="element-3">Продолжить</button>
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
export class ProjectBasicsComponent {
    constructor(public dialog: MatDialog) {

    }

    openDialog() {
        const dialogRef = this.dialog.open(ReportHistoryComponent, {
            height: '400px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}
