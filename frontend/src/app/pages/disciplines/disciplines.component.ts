import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { HistoryComponent } from './history/history.component';
import { LAlgebraComponent } from './l-algebra/l-algebra.component';
import { MatAnalysisComponent } from './mat-analysis/mat-analysis.component';
import { ProjectBasicsComponent } from './project-basics/project-basics.component';
import { BasicRussiaFoundationsComponent } from './basic-russia-foundations/basic-russia-foundations.component';
import { PhysicalEducationSportComponent } from './physical-education-sport/physical-education-sport.component';
import { MatChipsModule } from '@angular/material/chips';
import { NgForOf, NgSwitch, NgSwitchCase } from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-disciplines',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    HistoryComponent,
    LAlgebraComponent,
    MatAnalysisComponent,
    ProjectBasicsComponent,
    BasicRussiaFoundationsComponent,
    PhysicalEducationSportComponent,
    MatChipsModule,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    FormsModule,
  ],
  template: `
      <div class="header" style="padding: 16px">
          <mat-chip-listbox [(ngModel)]="selectedSemester">
              <mat-chip-option *ngFor="let semester of semesters" [value]="semester">
                  {{ semester }} семестр
              </mat-chip-option>
          </mat-chip-listbox>
      </div>

      <div style="padding: 16px">
          <ng-container [ngSwitch]="selectedSemester">
              <div *ngSwitchCase="1">
                  <!-- История россии -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> История России</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-history></app-history>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>
                  <!-- Линейная алгебра -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Линейная алгебра</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-l-algebra></app-l-algebra>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Математический анализ -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Математический анализ</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-mat-analysis></app-mat-analysis>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Основы проектной деятельности -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Основы проектной деятельности</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-project-basics></app-project-basics>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Основы российской государственности -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title>
                                      Основы российской государственности
                                  </mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-basic-russia-foundations></app-basic-russia-foundations>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Физическая культура и спорт -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Физическая культура и спорт</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-physical-education-sport></app-physical-education-sport>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

              </div>

              <div *ngSwitchCase="2">
                  <!-- История россии -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> История России</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-history></app-history>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>
                  <!-- Основы проектной деятельности -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Основы проектной деятельности</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-project-basics></app-project-basics>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Математический анализ -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Математический анализ</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-mat-analysis></app-mat-analysis>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

                  <!-- Физическая культура и спорт -->
                  <div class="spacer">
                      <mat-accordion>
                          <mat-expansion-panel
                                  (opened)="panelOpenState = true"
                                  (closed)="panelOpenState = false"
                          >
                              <mat-expansion-panel-header>
                                  <mat-panel-title> Физическая культура и спорт</mat-panel-title>
                              </mat-expansion-panel-header>
                              <app-physical-education-sport></app-physical-education-sport>
                          </mat-expansion-panel>
                      </mat-accordion>
                  </div>

              </div>

              <div *ngSwitchCase="3">
                  <!-- 3 семестр -->
              </div>

              <div *ngSwitchCase="4">
                  <!-- 4 семестр -->
              </div>

              <div *ngSwitchCase="5">
                  <!-- 5 семестр -->
              </div>

              <div *ngSwitchCase="6">
                  <!-- 6 семестр -->
              </div>

              <div *ngSwitchCase="7">
                  <!-- 7 семестр -->
              </div>

              <div *ngSwitchCase="8">
                  <!-- 8 семестр -->
              </div>

          </ng-container>
      </div>
  `,
  styles: [
    `
      .spacer {
        margin-bottom: 5px;
      }
      .header {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class DisciplinesComponent {
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedSemester = 1;
  panelOpenState = false;

  setSemester(semester: number) {
    this.selectedSemester = semester;
  }
}
