import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MainComponent} from "../main/main.component";

/** Home page component.
 * Это будет основная страница приложения
 *
 * */

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, HttpClientModule],
  template: `
    <p>home-page works!</p>
    <p>endpoint: "/"</p>
    <p>Страница находится в разработке</p>
    <div>
      <button mat-raised-button color="primary" (click)="goToMainPage()">
        Start
      </button>
    </div>
  `,
  styles: [``],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  goToMainPage() {
    this.router.navigate(['main']).then((r) => false);
    console.log('goToMainPage() -> пользователь перенаправлен на endpoint /main');
  }
}
