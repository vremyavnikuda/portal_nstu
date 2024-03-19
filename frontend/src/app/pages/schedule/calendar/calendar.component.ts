import { Component, OnInit } from '@angular/core'
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatGridList } from '@angular/material/grid-list'
import { ViewCalendarEventComponent } from '../view-calendar-event/ViewCalendarEventComponent'
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common'
import { GoogleCalendarService } from '../schedule-service/service'
import { events } from '@material/dom'
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../../../environment'

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
    <div *ngIf="events">
      <h2>Calendar Events</h2>
      <ul>
        <li *ngFor="let event of event">
          <strong>{{ event.summary }}</strong> - {{ event.start.dateTime | date }} - {{ event.end.dateTime | date }}
        </li>
      </ul>
    </div>
    
    <div>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FNovosibirsk&bgcolor=%233F51B5&showTitle=0&showPrint=0&showTz=0&src=aG9wcGVycGxheWVyMEBnbWFpbC5jb20&src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%230B8043" style="border:solid 1px #777" width="1024" height="1024" frameborder="0" scrolling="no"></iframe>
    </div>
  `,
  styles: [`

  `]
})

export class CalendarComponent implements OnInit {
  calendarId= environment.calendarId
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
