import { Component, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { Router } from '@angular/router'
import { HttpClient, HttpClientModule } from '@angular/common/http'


/** Home page component.
 * Это будет основная страница приложения
 *
 * */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButton,
    HttpClientModule
  ],
  template: `
    <p>
      home-page works!
    </p>
    <p>endpoint: "/"</p>
    <p>Страница находится в разработке</p>
    <div>
      <button mat-raised-button color="primary" (click)="goToMainPage()">Primary</button>
    </div>
  `,
  styles: [`
  
  `]
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  ngOnInit() {
  }

  //редирект на /main
  goToMainPage() {
    this.router.navigate(['/main'])
  }
}
