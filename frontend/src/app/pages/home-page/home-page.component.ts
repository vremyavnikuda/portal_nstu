import { Component, OnInit } from '@angular/core'


/** Home page component.
 * Это будет основная страница приложения
 *
 * */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      home-page works!
    </p>
    <p>endpoint: "/"</p>
    <p>Страница находится в разработке</p>
  `,
  styles: [`
  
  `]
})
export class HomePageComponent implements OnInit {
  ngOnInit() {
  }
}
