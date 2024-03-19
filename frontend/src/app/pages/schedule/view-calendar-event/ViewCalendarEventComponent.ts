import { Component} from '@angular/core'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card'
import { DatePipe, NgForOf } from '@angular/common'


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
    NgForOf
  ],

  template: `
    
    <p>компонент отображения событий календаря активен</p>
  
  `,
  styles: [`

    .user-card {
      display: flex;
      padding: 16px;
    }

  `]
})

/*Данный компонент отвечает за работу, списка событий которые отражаются в календаре
* TODO:@ViewCalendarEventComponent,@CalendarComponent
* */
export class ViewCalendarEventComponent {

}
