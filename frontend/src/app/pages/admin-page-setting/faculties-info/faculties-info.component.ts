import { Component, OnInit } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http'
import {
  BasicRussiaFoundationsComponent
} from '../../disciplines/basic-russia-foundations/basic-russia-foundations.component'
import { HistoryComponent } from '../../disciplines/history/history.component'
import { LAlgebraComponent } from '../../disciplines/l-algebra/l-algebra.component'
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion'
import { MatAnalysisComponent } from '../../disciplines/mat-analysis/mat-analysis.component'
import {
  PhysicalEducationSportComponent
} from '../../disciplines/physical-education-sport/physical-education-sport.component'
import { ProjectBasicsComponent } from '../../disciplines/project-basics/project-basics.component'

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
    ProjectBasicsComponent
  ],
  template: `
    <p>
      faculties-info works!
    </p>
    <h1>Учебные факультеты</h1>
    <div class="main-body">
      <mat-accordion>

        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 1
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

    <div class="main-body">
      <mat-accordion>
        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 2
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

    <div class="main-body">
      <mat-accordion>

        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 3
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

    <div class="main-body">
      <mat-accordion>

        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 4
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

    <div class="main-body">
      <mat-accordion>

        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 5
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

    <div class="main-body">
      <mat-accordion>

        <mat-expansion-panel (opened)="panelOpenState = true"
                             (closed)="panelOpenState = false">
          <mat-expansion-panel-header>
            <mat-panel-title>
              Факультет 6
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>
    </div>

  `,
  styles: [`
    .main-body {
      padding-top: 20px;
      margin: 0 auto;
      max-width: 1348px;

      mat-form-field {
        width: 100%;
      }
    }
  `]
})
export class FacultiesInfoComponent {
  panelOpenState = false

  constructor() {
  }
}
