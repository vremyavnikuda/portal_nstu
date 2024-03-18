import { Component} from '@angular/core'
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card'
import {
  Notifications,
} from '@mobiscroll/angular'
import { CalendarComponent } from './calendar/calendar.component'

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    CalendarComponent

  ],
  template: `
  <mat-card class="user-card">
    <mat-card-content>
      <app-calendar></app-calendar>
    </mat-card-content>
  </mat-card>
  `,
  styles: [`
    
  `],

  providers: [Notifications]
})

export class ScheduleComponent{

}
