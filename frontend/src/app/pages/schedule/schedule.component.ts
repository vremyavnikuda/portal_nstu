import {Component} from '@angular/core'
import {MatCard, MatCardContent} from '@angular/material/card'
import {
    Notifications
} from '@mobiscroll/angular'
import {ViewCalendarEventComponent} from './view-calendar-event/ViewCalendarEventComponent';
import {FullCalendarModule} from "@fullcalendar/angular";


@Component({
    selector: 'app-schedule',
    standalone: true,
    imports: [MatCard, MatCardContent, ViewCalendarEventComponent, FullCalendarModule],
    template: `
        <mat-card class="user-card">
            <mat-card-content class="content">
                <div class="right">
                    <app-view-calendar-event></app-view-calendar-event>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styles: [
        `
          .user-card {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin-bottom: 0;
          }

          .content {
            display: flex;
            height: 100%;
          }

          .left,
          .right {
            flex: 1;
          }

          .full-calendar {
            overflow: hidden;
          }
        `,
    ],
    providers: [Notifications, ViewCalendarEventComponent],
})

//Страница расписания
export class ScheduleComponent {

}
