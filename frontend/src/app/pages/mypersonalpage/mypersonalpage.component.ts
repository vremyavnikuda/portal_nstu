import { Component } from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterOutlet} from "@angular/router";
import { UserPersonalPagePortalComponent } from './user-personal-page-portal/user-personal-page-portal.component'

@Component({
  selector: 'app-mypersonalpage',
  standalone: true,
  imports: [
    MatGridListModule,
    RouterOutlet,
    UserPersonalPagePortalComponent
  ],
  template: `
    <ng-container>
      <app-user-personal-page-portal></app-user-personal-page-portal>
      <router-outlet></router-outlet>
    </ng-container>

  `,
  styles: [`
    .mat-grid-tile {
      border: 1px solid #ccc; /* Обводка серой линией */
    }

    /* Добавляем правую границу для разделения блоков */
    .border-right {
      border-right: 1px solid #ccc;
    }
    .spacer {
      margin-bottom: 5px;
    }
    `]
})
export class MypersonalpageComponent {

}
