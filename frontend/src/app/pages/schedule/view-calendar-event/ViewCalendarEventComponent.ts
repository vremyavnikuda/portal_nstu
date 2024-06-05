import { Component } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { DatePipe, NgForOf } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-view-calendar-event',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    NgForOf,
    FullCalendarModule,
  ],

  template: `
    <full-calendar [options]="calendarOptions">
      <ng-template #eventContent let-arg>
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </ng-template>
    </full-calendar>
  `,
  styles: [
    `
      .user-card {
        display: flex;
        padding: 16px;
      }
    `,
  ],
})

/*Данный компонент отвечает за работу, списка событий которые отражаются в календаре
 * TODO:@ViewCalendarEventComponent
 * */
export class ViewCalendarEventComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,

    //TODO:расписание событий в календаре
    //title: 'название события', start: (время события)'2024-06-07T19:00:00'
    events: [
      { title: 'Подведение итогов', start: '2024-06-07T19:00:00' },
      { title: 'Консультация по информатике', start: '2024-06-08T15:30:00' },
      { title: 'Подготовка к экзамену', start: '2024-06-10T19:00:00' },
    ],
  };
}
