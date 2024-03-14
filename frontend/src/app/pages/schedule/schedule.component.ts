import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MbscCalendarEvent,
  MbscEventcalendarOptions,
  MbscModule,
  Notifications,
  localeRu,
  setOptions, MbscEventcalendarView
} from '@mobiscroll/angular'

setOptions({
  locale: localeRu,
  theme: 'ios',
  themeVariant: 'light'
})

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MbscModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  template: `
    <div class="md-switching-view-cont">
      <mbsc-eventcalendar [data]="myEvents" [view]="calView" [headerTemplate]="customTemplate">
        <ng-template #customTemplate>
          <mbsc-calendar-nav class="cal-header-nav"></mbsc-calendar-nav>
          <div class="cal-header-picker">
            <mbsc-segmented-group [(ngModel)]="view" (change)="changeView()">
              <mbsc-segmented value="month">Month</mbsc-segmented>
              <mbsc-segmented value="week">Week</mbsc-segmented>
              <mbsc-segmented value="day">Day</mbsc-segmented>
              <mbsc-segmented value="agenda">Agenda</mbsc-segmented>
            </mbsc-segmented-group>
          </div>
          <mbsc-calendar-prev class="cal-header-prev"></mbsc-calendar-prev>
          <mbsc-calendar-today class="cal-header-today"></mbsc-calendar-today>
          <mbsc-calendar-next class="cal-header-next"></mbsc-calendar-next>
        </ng-template>
      </mbsc-eventcalendar>
    </div>
  `,
  styles: [`
    .md-switching-view-cont .mbsc-segmented {
      max-width: 350px;
      margin: 0 auto;
    }

    .md-switching-view-cont .mbsc-calendar-grid-item {
      height: 490px;
      box-sizing: border-box;
    }

    .cal-header-picker {
      flex: 1 0 auto;
    }

    .cal-header-nav {
      width: 200px;
    }

    /* material header order */

    .mbsc-material.cal-header-prev {
      order: 1;
    }

    .mbsc-material.cal-header-next {
      order: 2;
    }

    .mbsc-material.cal-header-nav {
      order: 3;
    }

    .mbsc-material .cal-header-picker {
      order: 4;
    }

    .mbsc-material .cal-header-today {
      order: 5;
    }

    /* windows header order */

    .mbsc-windows.cal-header-nav {
      order: 1;
    }

    .mbsc-windows.cal-header-prev {
      order: 2;
    }

    .mbsc-windows.cal-header-next {
      order: 3;
    }

    .mbsc-windows .cal-header-picker {
      order: 4;
    }

    .mbsc-windows .cal-header-today {
      order: 5;
    }
  `],

  providers: [Notifications]
})

export class ScheduleComponent implements OnInit {

  constructor(
    private _http: HttpClient,
    private notify: Notifications
  ) {
  }

  myEvents: MbscCalendarEvent[] = [];
  view = 'month';
  calView: MbscEventcalendarView = {
    calendar: { labels: true },
  };

  ngOnInit(): void {
    this._http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp;
    });
  }

  changeView(): void {
    setTimeout(() => {
      switch (this.view) {
        case 'year':
          this.calView = {
            calendar: { type: 'year' },
          };
          break;
        case 'month':
          this.calView = {
            calendar: { labels: true },
          };
          break;
        case 'week':
          this.calView = {
            schedule: { type: 'week' },
          };
          break;
        case 'day':
          this.calView = {
            schedule: { type: 'day' },
          };
          break;
        case 'agenda':
          this.calView = {
            calendar: { type: 'week' },
            agenda: { type: 'week' },
          };
          break;
      }
    });
  }
}
