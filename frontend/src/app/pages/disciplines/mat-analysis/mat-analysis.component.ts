import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialog} from "@angular/material/dialog";
import {ReportHistoryComponent} from "../history/dir/report-history/reporthistory.component";
import {ReportMatAnalysisComponent} from "./dir/report-mat-analysis/report-mat-analysis.component";

interface MatNode {
    name: string;
    children?: MatNode[];
}

const TREE_DATA_MAT: MatNode[] = [
    {
        name: 'Модуль 1',
        children: [{name: '1.1. Функции действительной переменной'}, {name: '1.2. Кривые в полярных координатах и заданные параметрически'}, {name: '1.3. Предел последовательности'}, {name: '1.4. Предел функции'}, {name: '1.4. Предел функции'}, {name: 'Контрольная работа №1 задача 1'}],
    },
    {
        name: 'Модуль 2',
        children: [{name: '2.1. Непрерывные функции'}, {name: 'Контрольная работа №1 задача 2'}],
    },
    {
        name: 'Модуль 3',
        children: [{name: '3.1. Производная функции'}, {name: '3.2. Производные функций, заданных неявно и параметрически'}, {name: 'Контрольная работа №1 задача 3'}],
    },
    {
        name: 'Модуль 4',
        children: [{name: '4.1. Раскрытие неопределенностей с помощью правила Лопиталя'}, {name: '4.2. Исследование функций'}, {name: 'Контрольная работа №1 задачи 4 и 5'}],
    },
    {
        name: 'Модуль 5',
        children: [{name: '5.1. Табличное интегрирование'}, {name: '5.2. Интегрирование внесением под знак дифференциала'}, {name: '5.3. Замена переменной в неопределенном интеграле'}, {name: '5.4. Интегрирование по частям в неопределенном интеграле'}, {name: '5.5. Интегрирование рациональных дробей'}, {name: 'Контрольная работа №2 задача 1'}],
    },
    {
        name: 'Модуль 6',
        children: [{name: '6.2. Несобственные интегралы'}, {name: 'Контрольная работа №2 задача 2'}],
    },
    {
        name: 'Модуль 7',
        children: [{name: '7.2. Несобственные интегралы'}, {name: 'Контрольная работа №2 задача 2'}],
    },
    {
        name: 'Журнал курса',
        children: [{name: 'ИНФО'}, {name: 'FAQ'}],
    },
];

interface ExampleMatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-mat-analysis',
    standalone: true,
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatDividerModule,
        MatTreeModule,
        MatIconModule,
        MatProgressBarModule
    ],
    template: `
        <div>
            <div>
                <mat-chip-listbox>
                    <mat-chip>
                        Шеремет О.В.
                    </mat-chip>
                    <mat-chip>
                        Гумерова Е.И.
                    </mat-chip>
                    <button mat-flat-button class="element-3" (click)="openDialog()">Отчет</button>
                </mat-chip-listbox>
            </div>
            <mat-progress-bar mode="determinate" value="80"></mat-progress-bar>
        </div>
        
        <p>
            Курс для студентов заочной и дистанционной форм обучения по темам первого семестра дисциплин "Математический
            анализ" и "Высшая математика":
        </p>
        <p>1.Предел и непрерывность функции действительной переменной.</p>
        <p>2.Дифференциальное исчисление функций действительной переменной и функций многих переменных.</p>
        <p>3.Интегральное исчисление функций действительной переменной.</p>

        <mat-divider></mat-divider>

        <div>
            <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
                <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
                    <button mat-icon-button disabled></button>
                    {{ node.name }}
                </mat-tree-node>
                <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
                    <button mat-icon-button matTreeNodeToggle
                            [attr.aria-label]="'Toggle ' + node.name">
                        <mat-icon class="mat-icon-rtl-mirror">
                            {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
                        </mat-icon>
                    </button>
                    {{ node.name }}
                </mat-tree-node>
            </mat-tree>
        </div>

        <mat-divider></mat-divider>

        <div class="container">
            <p>Факультеты и специальности</p>
            <mat-chip-listbox>
                <mat-chip>
                    ЗО ИДО
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

      .element-3 {
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
export class MatAnalysisComponent {

    private _transformer=(node:MatNode,level:number) =>{
        return{
            expandable:!!node.children && node.children.length > 0,
            name:node.name,
            level:level,
        };
    };

    treeControl=  new FlatTreeControl<ExampleMatNode>(
      node => node.level,
      node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(public dialog:MatDialog) {
        this.dataSource.data = TREE_DATA_MAT;
    }
    hasChild = (_: number, node: ExampleMatNode) => node.expandable;

    openDialog() {
        const dialogRef = this.dialog.open(ReportMatAnalysisComponent, {
            height: '400px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
