import { Component, OnInit } from '@angular/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatGridList } from '@angular/material/grid-list'
import { ViewCalendarEventComponent } from '../view-calendar-event/ViewCalendarEventComponent'
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common'
import { GoogleCalendarService } from '../schedule-service/service'
import { events } from '@material/dom'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatCard,
    MatCardContent,
    MatGridList,
    ViewCalendarEventComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    DatePipe,
    HttpClientModule,
  ],providers:[
    GoogleCalendarService
  ],
  template: `
  
  `,
  styles: [`

  `]
})

export class CalendarComponent implements OnInit {
  calendarId= 'primary' //calendarId
  event: any[] = []

  constructor(
    private googleCalendarService: GoogleCalendarService,
  ) {
  }

  ngOnInit() {
    this.googleCalendarService.getEvents(this.calendarId).subscribe(
      (data) => {
        this.event = data.items
      },
      error => {
        console.error('Error messages fetching events', error)
      }
    )
  }
  protected readonly events = events
}
