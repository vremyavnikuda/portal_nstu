import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarView } from '@angular/material/datepicker/testing'
import { BrowserModule } from '@angular/platform-browser'
import { MbscCalendarEvent, MbscEventcalendarOptions, MbscModule, Notifications, localeRu } from '@mobiscroll/angular'
import { Router } from '@angular/router'


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MbscModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  template: `
    <div>
      <mbsc-eventcalendar [data]="myEvents" [options]="eventSettings"></mbsc-eventcalendar>
    </div>


  `,
  styles: [``],
  providers: [Notifications]
})
export class ScheduleComponent implements OnInit {

  constructor(
    private _http: HttpClient,
    private notify: Notifications,
  ) {
  }

  myEvents: MbscCalendarEvent[] = []

  eventSettings: MbscEventcalendarOptions = {
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    eventDelete: true,
    themeVariant:'light',
    view: {
      schedule: { type: 'week' }
    },
    onEventClick: (args) => {
      this.notify.toast({
        message: args.event.title
      })
    }
  }

  ngOnInit(): void {
    this._http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      this.myEvents = resp
    })
  }
}
