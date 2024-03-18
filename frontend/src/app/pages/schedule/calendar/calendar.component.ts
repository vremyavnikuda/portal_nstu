import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatCard, MatCardContent } from '@angular/material/card'

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatCard,
    MatCardContent
  ],
  template: `
    <full-calendar class="full-calendar" [options]="calendarOptions"></full-calendar>
  `,
  styles: [`
    .user-card {
      display: flex;
      margin-bottom: 16px;
      width: 100%; 
      height: 100vh;
    }

    .full-calendar {
      flex: 1;
    }
  `]
})

export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }
}
