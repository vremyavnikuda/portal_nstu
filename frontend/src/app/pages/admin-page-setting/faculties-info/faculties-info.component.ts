import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BasicRussiaFoundationsComponent } from '../../disciplines/basic-russia-foundations/basic-russia-foundations.component';
import { HistoryComponent } from '../../disciplines/history/history.component';
import { LAlgebraComponent } from '../../disciplines/l-algebra/l-algebra.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatAnalysisComponent } from '../../disciplines/mat-analysis/mat-analysis.component';
import { PhysicalEducationSportComponent } from '../../disciplines/physical-education-sport/physical-education-sport.component';
import { ProjectBasicsComponent } from '../../disciplines/project-basics/project-basics.component';
import { MatTableDataSource } from '@angular/material/table';
import { NgForOf, NgIf } from '@angular/common';
import { MygroupComponent } from '../../mygroup/mygroup.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-faculties-info',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    HttpClientModule,
    BasicRussiaFoundationsComponent,
    HistoryComponent,
    LAlgebraComponent,
    MatAccordion,
    MatAnalysisComponent,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    PhysicalEducationSportComponent,
    ProjectBasicsComponent,
    NgIf,
    NgForOf,
    MatCard,
    MatCardContent,
    MatButton,
  ],
  providers: [MygroupComponent],
  template: `
    <p>faculties-info works!</p>
    <h1 class="main-body">Учебные факультеты</h1>
    <div
      class="main-body"
      *ngIf="_dataFaculty && _dataFaculty.data && _dataFaculty.data.length > 0"
    >
      <mat-accordion *ngFor="let facultyData of _dataFaculty.data">
        <mat-expansion-panel
          (opened)="panelOpenState = true"
          (closed)="panelOpenState = false"
          class="user-card"
        >
          <div *ngFor="let groupData of _dataGroup.data" class="user-card">
            <button
              mat-raised-button
              class="group_style"
              *ngIf="
                groupData.ReductionFacultyName ==
                facultyData.ReductionFacultyName
              "
            >
              {{ groupData.Name }}
            </button>
          </div>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ facultyData.Name }}
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
    <div
      *ngIf="
        !_dataFaculty || !_dataFaculty.data || _dataFaculty.data.length === 0
      "
      class="main-body"
    >
      Данные загружаются...
    </div>
  `,
  styles: [
    `
      .group_style {
        width: 10%;
      }

      .main-body {
        padding-top: 20px;
        margin: 0 auto;
        max-width: 1348px;

        mat-form-field {
          width: 100%;
        }
      }

      .user-card {
        margin-bottom: 16px;
      }
    `,
  ],
})
export class FacultiesInfoComponent implements OnInit {
  panelOpenState = false;
  _dataFaculty!: MatTableDataSource<any>;
  _dataGroup!: MatTableDataSource<any>;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataFaculties();
    this.loadDataGroups();
  }

  //API запрос на получение всех факультетов
  loadDataFaculties() {
    this._http
      .get<any[]>(
        'http://localhost:8080/api/get/facultyService/getAllFaculties'
      )
      .subscribe(
        (dataFaculty) => {
          this._dataFaculty = new MatTableDataSource(dataFaculty);
          console.log(dataFaculty);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  //API запрос на получение всех групп
  loadDataGroups() {
    this._http
      .get<any[]>('http://localhost:8080/api/get/facultyService/getAllGroups')
      .subscribe(
        (dataGroup) => {
          this._dataGroup = new MatTableDataSource(dataGroup);
          console.log(dataGroup);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
