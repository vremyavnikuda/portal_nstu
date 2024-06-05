import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {HistoryComponent} from "./history/history.component";
import {LAlgebraComponent} from "./l-algebra/l-algebra.component";
import {MatAnalysisComponent} from "./mat-analysis/mat-analysis.component";
import {ProjectBasicsComponent} from "./project-basics/project-basics.component";
import {BasicRussiaFoundationsComponent} from "./basic-russia-foundations/basic-russia-foundations.component";
import {PhysicalEducationSportComponent} from "./physical-education-sport/physical-education-sport.component";

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
    PhysicalEducationSportComponent
  ],
  template: `
      <div style="padding: 16px">
          <div class="spacer">
              <mat-accordion>

                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              История России
                          </mat-panel-title>
                          
                      </mat-expansion-panel-header>
                      <app-history></app-history>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>

          <div class="spacer">
              <mat-accordion>
                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              Линейная алгебра
                          </mat-panel-title>
                        
                      </mat-expansion-panel-header>
                      <app-l-algebra></app-l-algebra>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>

          <div class = "spacer">
              <mat-accordion>

                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              Математический анализ
                          </mat-panel-title>
                      </mat-expansion-panel-header>
                      <app-mat-analysis></app-mat-analysis>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>

          <div class = "spacer">
              <mat-accordion>

                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              Основы проектной деятельности
                          </mat-panel-title>
                        
                      </mat-expansion-panel-header>
                      <app-project-basics></app-project-basics>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>

          <div class = "spacer">
              <mat-accordion>

                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              Основы российской государственности
                          </mat-panel-title>
                      </mat-expansion-panel-header>
                      <app-basic-russia-foundations></app-basic-russia-foundations>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>

          <div class = "spacer">
              <mat-accordion>

                  <mat-expansion-panel (opened)="panelOpenState = true"
                                       (closed)="panelOpenState = false">
                      <mat-expansion-panel-header>
                          <mat-panel-title>
                              Физическая культура и спорт
                          </mat-panel-title>
                      </mat-expansion-panel-header>
                      <app-physical-education-sport></app-physical-education-sport>
                  </mat-expansion-panel>
              </mat-accordion>
          </div>
      </div>
  `,
  styles: [`
    .spacer {
      margin-bottom: 5px;
    }
    `]
})
export class DisciplinesComponent {
  panelOpenState = false;

}
